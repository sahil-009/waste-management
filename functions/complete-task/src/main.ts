import { Client, Databases } from 'node-appwrite';

// Environment variables
const PROJECT_ID = process.env.APPWRITE_FUNCTION_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = 'waste_management_db';
const USERS_COLLECTION_ID = 'users';
const REPORTS_COLLECTION_ID = 'waste_reports';

export default async ({ req, res, log, error }: any) => {
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(PROJECT_ID!)
        .setKey(API_KEY!);

    const databases = new Databases(client);

    try {
        const report = JSON.parse(req.body);

        // Check if the trigger was a status change to 'collected'
        // Note: This function triggers on ANY update. We need to check if status is 'collected'
        // and if we haven't already processed it (e.g. check if rewardAmount is already set or collectedAt is set).
        // However, the user prompt says "When status becomes collected".
        // We'll assume the client sets status='collected' and uploads the photo.
        // This function will finalize it by setting collectedAt and giving rewards.

        if (report.status !== 'collected') {
            return res.json({
                success: true,
                message: 'Status is not collected. Ignoring.',
            });
        }

        if (report.collectedAt) {
            return res.json({
                success: true,
                message: 'Task already marked as completed. Ignoring.',
            });
        }

        // 1. Calculate Reward
        // Fixed 10 points as per requirement for simplicity
        const rewardPoints = 10;

        // 2. Update Report with Reward and Timestamp
        await databases.updateDocument(
            DATABASE_ID,
            REPORTS_COLLECTION_ID,
            report.$id,
            {
                rewardAmount: rewardPoints,
                collectedAt: new Date().toISOString(),
            }
        );

        // 3. Update Worker's Points
        if (report.assignedWorkerId) {
            // Find the worker user document
            // We need to query by userId, not document ID, unless they are same.
            // In our schema, userId is a field.
            // Let's assume we need to find the user doc first.
            const workerDocs = await databases.listDocuments(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                [Query.equal('userId', report.assignedWorkerId)]
            );

            if (workerDocs.total > 0) {
                const workerDoc = workerDocs.documents[0];
                const currentPoints = workerDoc.rewardPoints || 0;

                await databases.updateDocument(
                    DATABASE_ID,
                    USERS_COLLECTION_ID,
                    workerDoc.$id,
                    {
                        rewardPoints: currentPoints + rewardPoints
                    }
                );
                log(`Awarded ${rewardPoints} points to worker ${report.assignedWorkerId}`);
            } else {
                error(`Worker profile not found for ID: ${report.assignedWorkerId}`);
            }
        }

        return res.json({
            success: true,
            message: 'Task completed and rewards assigned.',
        });
    } catch (err: any) {
        error('Error completing task: ' + err.message);
        return res.json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};

import { Query } from 'node-appwrite';

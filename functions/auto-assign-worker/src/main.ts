import { Client, Databases, Query } from 'node-appwrite';

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
        // 1. Parse the event data (newly created report)
        // In Appwrite functions, req.body is the document that triggered the event if triggered by event.
        // Or it might be a JSON string if passed via HTTP.
        // For event triggers, the payload is usually in req.body.
        const report = JSON.parse(req.body);

        // Only proceed if status is 'pending' and no worker is assigned
        if (report.status !== 'pending' || report.assignedWorkerId) {
            return res.json({
                success: true,
                message: 'Report already assigned or not pending.',
            });
        }

        // 2. Find a worker to assign
        // Simple Round-Robin or Random for MVP.
        // Let's fetch all workers.
        const workers = await databases.listDocuments(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            [Query.equal('role', 'worker')]
        );

        if (workers.total === 0) {
            log('No workers found to assign.');
            return res.json({ success: false, message: 'No workers available.' });
        }

        // Pick a random worker for simplicity in this MVP
        // A real round-robin would need to store the last assigned index somewhere.
        const randomIndex = Math.floor(Math.random() * workers.documents.length);
        const selectedWorker = workers.documents[randomIndex];

        // 3. Update the report
        const updatedReport = await databases.updateDocument(
            DATABASE_ID,
            REPORTS_COLLECTION_ID,
            report.$id,
            {
                assignedWorkerId: selectedWorker.userId,
                status: 'assigned',
            }
        );

        log(`Assigned report ${report.$id} to worker ${selectedWorker.userId}`);

        return res.json({
            success: true,
            message: 'Worker assigned successfully.',
            data: updatedReport,
        });
    } catch (err: any) {
        error('Error assigning worker: ' + err.message);
        return res.json({
            success: false,
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};

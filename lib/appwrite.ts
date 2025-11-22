import { Account, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

// Configuration
export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '69208d73003af6945af1',
    databaseId: '692151fa00169a1e3260',
    usersCollectionId: 'users',
    reportsCollectionId: 'waste_reports',
    wasteBucketId: 'waste_photos',
    pickupBucketId: 'pickup_photos',
};

// Init Client
const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform('com.wastemanagement.app');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client }; // Export client for realtime subscriptions


// Types
export interface UserProfile {
    userId: string;
    name: string;
    email: string;
    role: 'resident' | 'worker';
    rewardPoints: number;
}

export interface WasteReport {
    $id?: string;
    residentId: string;
    locationText: string;
    latitude: number;
    longitude: number;
    wastePhotoUrl: string;
    status: 'pending' | 'assigned' | 'collected';
    assignedWorkerId?: string;
    pickupPhotoUrl?: string;
    rewardAmount?: number;
    createdAt?: string;
    collectedAt?: string;
}

// Helper Functions

// --- Auth ---
export async function getCurrentUser() {
    try {
        const user = await account.get();
        // Also fetch profile from database
        const profile = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('userId', user.$id)]
        );

        if (profile.total > 0) {
            return { ...user, profile: profile.documents[0] as unknown as UserProfile };
        }
        return user;
    } catch (error) {
        console.log('No user logged in');
        return null;
    }
}

export async function createSession(email: string, password: string) {
    return await account.createEmailPasswordSession(email, password);
}

export async function deleteSession() {
    return await account.deleteSession('current');
}

export async function createUserProfile(
    userId: string,
    name: string,
    email: string,
    role: 'resident' | 'worker'
) {
    return await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        {
            userId,
            name,
            email,
            role,
            rewardPoints: 0
        }
    );
}

export async function signUp(
    email: string,
    password: string,
    name: string,
    role: 'resident' | 'worker'
) {
    try {
        // Create auth account
        const user = await account.create(ID.unique(), email, password, name);

        // Create session
        await createSession(email, password);

        // Create user profile in database
        await createUserProfile(user.$id, name, email, role);

        return user;
    } catch (error: any) {
        console.error('Signup error:', error);
        throw error;
    }
}


// --- Database ---
export async function createReport(report: Omit<WasteReport, 'status' | '$id'>) {
    return await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.reportsCollectionId,
        ID.unique(),
        {
            ...report,
            status: 'pending',
            createdAt: new Date().toISOString()
        }
    );
}

export async function getReports(role: 'resident' | 'worker', userId: string) {
    const queries = [Query.orderDesc('$createdAt')];

    if (role === 'resident') {
        queries.push(Query.equal('residentId', userId));
    } else {
        // Workers see assigned tasks or pending ones if you want them to pick (but we have auto-assign)
        // For this logic, let's say workers see tasks assigned to them.
        queries.push(Query.equal('assignedWorkerId', userId));
    }

    return await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.reportsCollectionId,
        queries
    );
}

export async function updateReportStatus(reportId: string, status: string, data?: Partial<WasteReport>) {
    return await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.reportsCollectionId,
        reportId,
        {
            status,
            ...data
        }
    );
}

// --- Storage ---
export async function uploadFile(uri: string, bucketId: string) {
    // For React Native, we need to construct a FormData-like object or use the special file object
    // Appwrite RN SDK handles 'uri', 'name', 'type', 'size' object.
    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const type = match ? `image/${match[1]}` : `image`;

    // Get file size (for React Native, we'll use a default or fetch it)
    // In production, you might want to use expo-file-system to get actual size
    const file = {
        uri: uri,
        name: filename || 'photo.jpg',
        type: type,
        size: 1000000, // Default size, can be improved with expo-file-system
    };

    return await storage.createFile(bucketId, ID.unique(), file as any);
}

export function getFilePreview(fileId: string, bucketId: string) {
    return storage.getFilePreview(bucketId, fileId);
}

/**
 * Subscribe to realtime updates for task assignments
 * @param workerId - The worker's user ID to listen for assignments
 * @param callback - Function to call when a task is assigned
 * @returns Unsubscribe function
 */
export function subscribeToTaskAssignments(
    workerId: string,
    callback: (payload: any) => void
) {
    const channel = `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.reportsCollectionId}.documents`;

    return client.subscribe(channel, (response) => {
        // Check if this is a document update event
        if (response.events.includes(`databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.reportsCollectionId}.documents.*.update`)) {
            const document = response.payload as WasteReport;

            // Check if this task was just assigned to this worker
            if (document.assignedWorkerId === workerId && document.status === 'assigned') {
                callback(document);
            }
        }
    });
}


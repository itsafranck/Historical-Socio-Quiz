import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  getDocFromServer 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { QuizResult } from '../types';

/**
 * Interface for detailed Firestore error reporting
 */
interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
}

const handleFirestoreError = (error: any, operation: FirestoreErrorInfo['operationType'], path: string | null) => {
  console.error(`Firestore ${operation} failed at ${path}:`, error);
  const info: FirestoreErrorInfo = {
    error: error.message || 'Unknown error',
    operationType: operation,
    path
  };
  throw new Error(JSON.stringify(info));
};

export const testConnection = async () => {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or internet connection.");
    }
  }
};

export const saveQuizResult = async (result: QuizResult) => {
  try {
    const submissionsRef = collection(db, 'submissions');
    await addDoc(submissionsRef, {
      ...result,
      submittedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, 'create', 'submissions');
  }
};

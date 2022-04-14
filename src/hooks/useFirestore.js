import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
const useFirestore = function (collectionName, condition) {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    let collectionRef = collection(db, collectionName);
    let collectionQuery;
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionQuery = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy("createdAt")
      );
    }
    const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });

    return unsubscribe;
  }, [collectionName, condition]);

  return documents;
};

export default useFirestore;

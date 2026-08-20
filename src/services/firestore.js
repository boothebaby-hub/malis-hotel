// Firestore data layer.
// Collections: rooms, services, products, reservations, users
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

function collectionApi(name) {
  const ref = collection(db, name);
  return {
    async list() {
      const snap = await getDocs(ref);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },
    async get(id) {
      const snap = await getDoc(doc(db, name, id));
      return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    },
    async create(data) {
      const docRef = await addDoc(ref, { ...data, createdAt: serverTimestamp() });
      return docRef.id;
    },
    async update(id, data) {
      await updateDoc(doc(db, name, id), data);
    },
    async remove(id) {
      await deleteDoc(doc(db, name, id));
    },
  };
}

export const roomsApi = collectionApi("rooms");
export const servicesApi = collectionApi("services");
export const productsApi = collectionApi("products");
export const usersApi = collectionApi("users");

// Reservations get extra query helpers beyond the basic CRUD set.
const reservationsRef = collection(db, "reservations");

export const reservationsApi = {
  ...collectionApi("reservations"),

  async listForUser(userId) {
    const q = query(reservationsRef, where("userId", "==", userId), orderBy("checkIn", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  async create({ userId, roomId, checkIn, checkOut, guests, totalPrice }) {
    const docRef = await addDoc(reservationsRef, {
      userId,
      roomId,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: "confirmed",
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },

  async cancel(id) {
    await updateDoc(doc(db, "reservations", id), { status: "cancelled" });
  },
};

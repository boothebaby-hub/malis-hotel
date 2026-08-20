const BASE = import.meta.env.BASE_URL;
export const rooms = [
  {
    id: "willow-suite",
    name: "The Willow Suite",
    image: `${BASE}rooms/willow-suite.jpg`,
    price: 210,
    capacity: 2,
    size: "38 m²",
    description:
      "A garden-facing suite with a reading nook, deep soaking tub, and a private balcony overlooking the willow courtyard.",
    amenities: ["King bed", "Soaking tub", "Balcony", "Espresso bar"],
  },
  {
    id: "orchard-room",
    name: "Orchard Room",
    image: `${BASE}rooms/orchard-room.jpg`,
    price: 165,
    capacity: 2,
    size: "28 m²",
    description:
      "Warm, quiet, and compact — ideal for a short stay. Overlooks the old orchard on the east side of the property.",
    amenities: ["Queen bed", "Rain shower", "Window seat"],
  },
  {
    id: "harborview-loft",
    name: "Harborview Loft",
    image: `${BASE}rooms/harborview-loft.jpg`,
    price: 275,
    capacity: 3,
    size: "45 m²",
    description:
      "A split-level loft with harbor views, a small sitting room, and a daybed that suits a third guest.",
    amenities: ["King bed", "Daybed", "Harbor view", "Sitting room"],
  },
  {
    id: "cellar-twin",
    name: "Cellar Twin",
    image: `${BASE}rooms/cellar-twin.jpg`,
    price: 140,
    capacity: 2,
    size: "24 m²",
    description:
      "Set into the old stone cellar, cool and quiet, with two long twin beds and exposed original brickwork.",
    amenities: ["Twin beds", "Exposed brick", "Blackout drapes"],
  },
];

export const services = [
  {
    id: "breakfast",
    name: "Morning table",
    description: "A set breakfast of local produce, served in the courtyard or brought to your room.",
  },
  {
    id: "spa",
    name: "Bath house",
    description: "Steam room, cold plunge, and two treatment rooms, open daily from 7am to 9pm.",
  },
  {
    id: "Guest Helper",
    name: "Guest Helper",
    description: "Restaurant bookings, local guides, and transport arranged on request.",
  },
  {
    id: "laundry",
    name: "Laundry & pressing",
    description: "Same-day service when requested before 10am.",
  },
];
export const VILLAGES: string[] = [
  "Agwarkhas", "Aharan", "Amanabad", "Arela", "Barhan",
  "Barara", "Basona", "Bichpuri", "Bilshad", "Chaurangahar",
  "Dehtora", "Deoretha", "Etmadpur", "Gadhia", "Gijaur",
  "Gokulpur", "Hakimpur", "Hathuara", "Ibdah", "Jaitpur",
  "Kakrari", "Kakua", "Karmana", "Khandauli", "Khandaua",
  "Khera", "Kuberpur", "Kukapur", "Madhopur", "Mahmadpur",
  "Mau", "Mundi", "Nagla Kachh", "Nagla Kalan", "Nagla Kishan",
  "Nagla Madi", "Nagla Nagli", "Nagla Padma", "Nagla Shekhu",
  "Nagla Udhan", "Nainana Brahmanan", "Nainana Jat", "Nainana Rajputan",
  "Pachgai Khera", "Palia", "Patholi", "Raipur", "Rahankalan",
  "Rajaura", "Rajpur", "Ramnagar", "Rasulpur", "Rohn",
  "Saiyan", "Samsabad", "Sarai Khwaja", "Sawai", "Shahzadpur",
  "Shyamo", "Sikandra", "Tantpur", "Tundla", "Udiapur", "Usraha",
];

export const HOT_VILLAGES: string[] = ["Raipur", "Rahankalan"];

export const VILLAGE_RATES: Record<string, string> = {
  Raipur: "₹18,000–₹25,000/sq yard",
  Rahankalan: "₹18,000–₹25,000/sq yard",
  Etmadpur: "₹15,000–₹20,000/sq yard",
  Khandauli: "₹12,000–₹18,000/sq yard",
  Kuberpur: "₹12,000–₹18,000/sq yard",
  Tundla: "₹10,000–₹14,000/sq yard",
  Barhan: "₹10,000–₹14,000/sq yard",
  Sikandra: "₹14,000–₹18,000/sq yard",
};

export const DEFAULT_RATE = "₹8,000–₹12,000/sq yard";

export const getVillageRate = (village: string): string =>
  VILLAGE_RATES[village] ?? DEFAULT_RATE;

export const isHotVillage = (village: string): boolean =>
  HOT_VILLAGES.includes(village);

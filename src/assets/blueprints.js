const itemBP = {
  alarm: false,
  alarmTime: null,
  amount: null,
  authorId: null,
  buyerId: null,
  categories: [],
  dateCreated: null,
  datesUpdated: [],
  description: null,
  dueDate: null,
  gallery: [],
  imgCover: null,
  isDefault: false,
  isShared: false,
  isVisible: true,
  loading: false,
  locked: false,
  name: null,
  pendingUpdate: false,
  recurring: false,
  recurrencePattern: null,
  repeatUntil: null,
  sharedValue: [],
  sharedWith: [],
  status: 'active',
  tags: [],
  type: null,
  datesUpdated: [],
}

const projBP = {
  address: null,
  amenities: [],
  amenitiesIds: [],
  authorId: null,
  blueprintsFiles: [],
  blueprintsIds: [],
  categories: [],
  claim: null,
  creator: null,
  dates: null,
  descFull: null,
  descShort: null,
  descSold: null,
  devStatus: 'coming soon',
  devType: null,
  docsFiles: [],
  docsIds: [],
  galleryFiles: [],
  galleryIds: [],
  id: null,
  imgCover: null,
  isNew: true,
  loading: false,
  messages: [],
  name: null,
  pendingUpdate: false,
  // draft, published, archived
  status: 'draft',
  saleStatus: 'coming soon',
  devStatus: 'drafting',
  devType: null,
  tags: [],
  projItems: [],
}

const amenitiesOptsBP = [
  {
    id: 'airConditioning',
    selected: false,
    lang: {
      ca: 'Aire condicionat',
      en: 'Air conditioning',
      es: 'Aire acondicionado',
    }
  },
  {
    id: 'alarm',
    selected: false,
    lang: {
      ca: 'Alarma',
      en: 'Alarm',
      es: 'Alarma',
    }
  },
  {
    id: 'balcony',
    selected: false,
    lang: {
      ca: 'Balcó',
      en: 'Balcony',
      es: 'Balcón',
    }
  },
  {
    id: 'centralHeating',
    selected: false,
    lang: {
      ca: 'Calefacció central',
      en: 'Central heating',
      es: 'Calefacción central',
    }
  },
  {
    id: 'chimney',
    selected: false,
    lang: {
      ca: 'Xemeneia',
      en: 'Chimney',
      es: 'Chimenea',
    }
  },
  {
    id: 'elevator',
    selected: false,
    lang: {
      ca: 'Ascensor',
      en: 'Elevator',
      es: 'Ascensor',
    }
  },
  {
    id: 'garden',
    selected: false,
    lang: {
      ca: 'Jardí',
      en: 'Garden',
      es: 'Jardín',
    }
  },
  {
    id: 'patio',
    selected: false,
    lang: {
      ca: 'Pati',
      en: 'Patio',
      es: 'Patio',
    }
  },
  {
    id: 'parking',
    selected: false,
    lang: {
      ca: 'Aparcament',
      en: 'Parking',
      es: 'Aparcamiento',
    }
  },
  {
    id: 'pool',
    selected: false,
    lang: {
      ca: 'Piscina',
      en: 'Pool',
      es: 'Piscina',
    }
  },
  {
    id: 'storage',
    selected: false,
    lang: {
      ca: 'Magatzem',
      en: 'Storage',
      es: 'Almacenamiento',
    }
  },
  {
    id: 'terrace',
    selected: false,
    lang: {
      ca: 'Terrassa',
      en: 'Terrace',
      es: 'Terraza',
    }
  }
]

const addressBP = {
  city: 'Terrassa',
  country: null,
  gmaps: null,
  letter: null,
  line1: null,
  line2: null,
  neighbourhood: null,
  number: null,
  projId: null,
  province: 'Barcelona',
  zip: null,
}

const typologyItemBP = {
  amenities: [],
  areas: [],
  bathrooms: null,
  buyerId: null,
  blueprintsFiles: [],
  blueprintsIds: [],
  categories: [],
  door: null,
  elevator: null,
  floor: null,
  galleryFiles: [],
  galleryIds: [],
  ownerId: null,
  rooms: null,
  sellStatus: 'coming soon',
  stairs: null,
  status: 'draft',
  surface: null,
  tags: [],
}

const profileBP = {
  email: null,
  isLoading: false,
  loggedIn: false,
  name: null,
  surname1: null,
  surname2: null,
  nickname: null,
  phoneNumber: null,
  pendingUpdate: false,
  uid: null,
  dateCreated: null,
  datesUpdated: [],
  lastLogin: null,
  isVerified: false,
  verificationToken: null,
  language: 'ca',
  notificationPreferences: {
    email: true,
    sms: false,
  },
  profilePicture: null,
}

const datesBP = {
  created: null,
  end: null,
  lastSaved: null,
  start: null,
  updated: [],
  published: null,
}

const msgBP = {
  dateCreated: null,
  title: null,
  message: null,
  clearance: 'admin',
}

const itemAreaBP = {
  name: null,
  surface: null,
}

const credentialsBP = {
  email: null,
  password: null
}

export { 
  addressBP,
  amenitiesOptsBP,
  credentialsBP,
  datesBP,
  itemAreaBP,
  itemBP,
  msgBP,
  profileBP,
  projBP,
  typologyItemBP,
}
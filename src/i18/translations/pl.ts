const filterParams = {
  ariaLabels: {
    phrase: "Pole tekstowe z frazą, po której będą filtrowane elementy",
    orderBy: "Pole wyboru wartości, po której odbywać się będzie sortowanie",
    direction: "Pole wboru kierunku sortowania",
    showInactive:
      "Przełącznik pozwalający zadecydować, czy w liście powinny pojawić się nieaktywne elemenety",
  },
  labels: {
    phrase: "Fraza",
    orderBy: "Sortowanie po polu",
    direction: "Kierunek sortowania",
    showInactive: "Wyświetlić nieaktywne?",
  },
  directionOptions: {
    asc: "Rosąco",
    desc: "Malejąco",
  },
  orderByOptions: {
    name: "Nazwa",
    createdAt: "Data utworzenia",
    updatedAt: "Data aktualizacji",
  },
  componentHeadingTooltip: "Kliknij, aby rozwinąć",
  componentHeadingText: "Kliknij, aby wyświetlić opcje filtrowania",
  submitButtonTooltip: "Kliknij, aby filtrować listę",
  submitButtonText: "Filtruj",
};

const eventImage = {
  ariaLabel: "Zdjęcie tematyczne wydarzenia",
};

const styledSwitch = {
  defaultLabel: "Czy aktywny?*",
  defaultLeft: "Nie",
  defaultRight: "Tak",
};

const createEventPage = {
  index: {
    eventFormStep: "Dane o wydarzeniu",
    createSessions: "Konferencje",
    mailNotifications: "Powiadomienia mailowe",
    summary: "Podsumowanie",
  },
  createSessions: {
    newSessionName: "Nowa konferencja",
    newSessionCreateSuccess: "Nowa konferencja została utworzona",
    pageHeader: "Dodaj konferencje",
    deleteAllSessionsButtonTooltip: "Wyczyść listę konferencji",
    deleteAllSessionsSuccess: "Konferencje z tego wydarzenia zostały usunięte",
    addNewSessionButtonToolTip: "Dodaj nową konferencję",
    noSessionsPresentMessage: "Wydarzenie nie posiada żadnych konferencji",
    previousStepButtonTooltip: "Kliknij, aby wrócić do poprzedniego kroku",
    previousStepButtonText: "Powrót",
    nextStepButtonTooltip: "Kliknij, aby przejść do kolejnego kroku",
    nextStepButtonText: "Dalej",
  },
  eventForm: {
    ariaLabels: {
      eventNameInput: "Pole tekstowe z nazwą wydarzenia",
      eventDescriptionPl: "Pole tekstowe z opisem wydarzenia w wersji polskiej",
      eventDescriptionEn:
        "Pole tekstowe z opisem wydarzenia w wersji angielskiej",
      eventMinutesBetweenSessions:
        "Pole numeryczne z przerwą czasową pomiędzy konferencjami podawaną w minutach",
      eventStartDate: "Pole wyboru daty rozpoczęcia wydarzenia",
      eventEndDate: "Pole wyboru zakończenia wydarzenia",
      eventRegistrationStartDate:
        "Pole wyboru daty rozpoczęcia zapisów na wydarzenia",
      eventOutsidersAllowed:
        "Przełącznik do ustawienia wstępu dla uczestników spoza Politechniki Łódzkiej",
      eventImageButton: "Przycisk do wyboru zdjęcia tematycznego wydarzenia",
      eventNextStep:
        "Przycisk do przejścia do następnego etapu tworzenia wydarzenia",
    },
    labels: {
      eventName: "Nazwa*",
      descriptionPl: "Opis w wersji polskiej*",
      descriptionEn: "Opis w wersji angielskiej",
      minutesBetweenSessions:
        "Przerwa czasowa pomiędzy konferencjami (w minutach)*",
      startDate: "Data rozpoczęcia*",
      endDate: "Data zakończenia*",
      registrationStartDate: "Data rozpoczęcia zapisów*",
      outsidersAllowed: "Wstęp dla uczestników spoza Politechniki?*",
    },
    imageButtonText: "Wybierz zdjęcie tematyczne wydarzenia",
    nextStepButtonTooltip: "Kliknij, aby przejść do kolejnego kroku",
    nextStepButtonText: "Dalej",
    pageHeader: "Dane o wydarzeniu",
  },
  sessionForm: {
    ariaLabels: {
      sessionName: "Pole tekstowe z nazwą konferencji",
      descriptionPl: "Pole tekstowe z opisem konferencji w wersji polskiej",
      descriptionEn: "Pole tekstowe z opisem konferencji w wersji angielskiej",
      sessionType: "Pole wyboru typu konferencji",
      eventBlock: "Pole wyboru bloku wydarzenia",
      location: "Pole wyboru lokacji, w której będzie odbywać się konferencja",
      room: "Pole wyboru pomieszczenia, w którym będzie odbywać się konferencja",
      speaker: "Pole wyboru prelegenta, który będzie prowadził konferencję",
      maxSeats: "Pole numeryczne z maksymalną ilością miejsc na konferencję",
      startTime: "Pole wyboru daty rozpoczęcia konferencji",
      endTime: "Pole wyboru daty zakończenia konferencji",
      saveSessionButton: "Przycisk do zapisu danych konferencji",
      deleteSessionButton: "Przycisk do usunięcia konferencji",
    },
    labels: {
      sessionName: "Nazwa*",
      descriptionPl: "Opis w wersji polskiej*",
      descriptionEn: "Opis w wersji angielskiej",
      sessionType: "Typ konferencji*",
      eventBlock: "Blok wydarzenia",
      location: "Lokacja*",
      room: "Pomieszczenie*",
      speaker: "Prelegent*",
      maxSeats: "Ilość miejsc*",
      startTime: "Data rozpoczęcia*",
      endTime: "Data zakończenia",
    },
    sessionTypeCreateMessage: "Taki typ nie istnieje, kliknij aby go stworzyć",
    speakerCreateMessage:
      "Taki prelegent nie istnieje, kliknij aby go stworzyć",
    locationCreateMessage: "Taka lokacja nie istnieje, kliknij aby ją stworzyć",
    eventBlockCreateSuccess: "Nowy blok został utworzony",
    roomCreateMessage:
      "Takie pomieszczenie nie istnieje, kliknij aby je stworzyć",
    updateSessionSuccess: "Konferencja została zaktualizowana",
    removeSessionSuccess: "Konferencja została usunięta",
    sessionNamePlaceholder: "Nowa sesja",
    saveSessionButtonTooltip: "Kliknij, aby zapisać dane konferencji",
    saveSessionButtonText: "Zapisz",
    deleteSessionButtonTooltip: "Kliknij, aby usunąć sesję",
    deleteSessionButtonText: "Usuń",
  },
  summary: {
    ariaLabels: {
      previouStepButton: "Przycisk do powrotu do poprzedniego kroku",
      submitButton: "Przycisk do utworzenia wydarzenia",
    },
    eventTableColumns: {
      name: "Nazwa wydarzenia",
      descriptionPl: "Opis wydarzenia w wersji polskiej",
      descriptionEn: "Opis wydarzenia w wersji angielskiej",
      startDate: "Data rozpoczęcia wydarzenia",
      endDate: "Data zakończenia wydarzenia",
    },
    sessionTableRows: {
      name: "Nazwa",
      descriptionPl: "Opis w wersji polskiej",
      descriptionEn: "Opis w wersji angielskiej",
      maxSeats: "Ilość miejsc",
      startDate: "Data rozpoczęcia",
      endDate: "Data zakończenia",
      speaker: "Prelegent",
      room: "Lokalizacja",
      sessionType: "Typ konferencji",
      eventBlock: "Blok wydarzenia",
    },
    pageHeading: "Podsumowanie",
    eventDataHeading: "Dane wydarzenia",
    sessionsDataHeading: "Konferencje",
    previousStepButtonTooltip: "Kliknij, aby wrócić do poprzedniego kroku",
    previousStepButtonText: "Wróć",
    submitButtonTooltip: "Kliknij, aby utworzyć wydarzenie",
    submitButtonText: "Zakończ",
  },
};

const eventPageManager = {
  index: {
    pageHeading: "Panel zarządzania wydarzeniami",
    eventDataTab: "Wydarzenie",
    sessionsTab: "Konferencje",
    mailNotificationsTab: "Powiadomienia mailowe",
  },
  summary: {
    ariaLabels: {
      updateEventButton: "Przycisk do edycji wydarzenia",
    },
    eventDataColumns: {
      name: "Nazwa",
      descriptionPl: "Opis w wersji polskiej",
      descriptionEn: "Opis w wersji angielskiej",
      noDescriptionEn: "Brak opisu w wersji angielskiej",
      startDate: "Data rozpoczęcia",
      noStartDate: "Brak daty rozpoczęcia",
      endDate: "Data zakończenia",
      noEndDate: "Brak daty zakończenia",
      registrationStartDate: "Data rozpoczęcia rejestracji",
      noRegistrationStartDate: "Brak daty rozpoczęcia rejestracji",
      outsidersAllowed: "Wstęp dla uczestników spoza Politechniki",
      yes: "Tak",
      no: "Nie",
      minutesBetweenDifferentSessions:
        "Odstęp pomiędzy konferencjami (w minutach)",
      createdAt: "Data utworzenia",
      noCreatedAt: "Brak daty utworzenia",
      updatedAt: "Data aktualizacji",
      noUpdatedAt: "Brak daty aktualizacji",
      active: "Czy aktywne?",
    },
    pageHeading: "Dane o wydarzeniu",
    eventImageHeading: "Zdjęcie tematyczne wydarzenia",
    updateEventButtonTooltip: "Kliknij, aby edytować wydarzenie",
    updateEventButtonText: "Edytuj",
  },
  sessionEntry: {
    ariaLabels: {
      accordion: "Rozwijany element z informacjami o konferencji",
      updateSessionButton:
        "Przycisk do otworzenia formularza do edycji konferencji",
    },
    updateSessionButtonTooltip: "Kliknij, aby edytować konferencję",
    updateSessionButtonText: "Edytuj",
  },
  sessionsPage: {
    sessionDataColumns: {
      name: "Nazwa",
      sessionType: "Typ konferencji",
      eventBlock: "Blok wydarzenia",
      descriptionPl: "Opis w wersji polskiej",
      descriptionEn: "Opis w wersji angielskiej",
      noDescriptionEn: "Brak opisu w wersji angielskiej",
      startDate: "Data rozpoczęcia",
      noStartDate: "Brak daty rozpoczęcia",
      endDate: "Data zakończenia",
      noEndDate: "Brak daty zakończenia",
      maxSeats: "Ilość miejsc",
      speaker: "Prelegent",
      address: "Adres",
      location: "Lokacja",
      room: "Pomieszczenie",
      createdAt: "Data utworzenia",
      noCreatedAt: "Brak daty utworzenia",
      updatedAt: "Data aktualizacji",
      noUpdatedAt: "Brak daty aktualizacji",
      active: "Czy aktywna?",
      yes: "Tak",
      no: "Nie",
    },
    ariaLabels: {
      createSessionButton:
        "Przycisk do otworzenia formularza do tworzenia konferencji",
    },
    createSessionButtonTooltip: "Kliknij, aby utworzyć konferencję",
    createSessionButtonText: "Dodaj konferencję",
    pageHeading: "Konferencje",
    sessionViewerHeading: "Podgląd konferencji",
  },
  updateEventForm: {
    ariaLabels: {
      name: "Pole tekstowe z nazwą wydarzenia",
      descriptionPl: "Pole tekstowe z opisem w wersji polskiej",
      descriptionEn: "Pole tekstowe z opisem w wersji angielskiej",
      minutesBetweenSessions:
        "Pole numeryczne z odstępem czasowym pomiędzy konferencjami w minutach",
      startDate: "Pole wyboru daty rozpoczęcia wydarzenia",
      endDate: "Pole wyboru daty zakończenia wydarzenia",
      registrationStartDate:
        "Pole wyboru daty rozpoczęcia zapisów na wydarzenie",
      outsidersAllowed:
        "Przełącznik do ustawienia wstępu dla uczestników spoza Politechniki na wydarzenie",
      uploadImageButton:
        "Przycisk do wgrania nowego zdjęcia tematycznego wydarzenia",
      submitButton: "Przycisk do zatwierdzenia zmian",
      cancelButton: "Przycisk do anulowania edycji wydarzenia",
    },
    labels: {
      name: "Nazwa*",
      descriptionPl: "Opis w wersji polskiej*",
      descriptionEn: "Opis w wersji angielskiej",
      minutesBetweenSessions:
        "Odstęp czasowy pomiędzy konferencjami (w minutach)*",
      startDate: "Data rozpoczęcia*",
      endDate: "Data zakończenia*",
      registrationStartDate: "Data rozpoczęcia zapisów*",
      outsidersAllowed: "Wstęp dla uczestników spoza Politechniki*",
    },
    pageHeading: "Edytuj wydarzenie",
    eventDataHeading: "Dane wydarzenia",
    activeHeading: "Aktywność",
    uploadImageButtonTooltip: "Kliknij, aby wybrać nowe zdjęcie",
    uploadImageButtonText: "Wybierz nowe zdjęcie",
    eventImageHeading: "Zdjęcie tematyczne wydarzenia",
    submitButtonTooltip: "",
    submitButtonText: "Zapisz",
    cancelButtonTooltip: "Kliknij, aby anulować edycję",
    cancelButtonText: "Anuluj",
  },
  updateSessionForm: {
    pageHeading: "Zaktualizuj konrefencję",
    dataHeading: "Dane o konferencji",
    activeHeading: "Aktywność",
    ariaLabels: {
      name: "Pole tekstowe z nazwą konferencji",
      descriptionPl: "Pole tekstowe z opisem w wersji polskiej",
      descriptionEn: "Pole tekstowe z opisem w wersji angielskiej",
      sessionType: "Pole wyboru typu konferencji",
      eventBlock: "Pole wyboru bloku wydarzenia dla konferencji",
      location: "Pole wyboru lokacji, w której odbędzie się wydarzenie",
      room: "Pole wyboru pomieszczenia, w którym odbędzie się wydarzenie",
      speaker: "Pole wyboru prelegenta, który będzie prowadził wydarzenie",
      maxSeats: "Pole numeryczne z ilością miejsc w konferencji",
      startDate: "Pole wyboru daty rozpoczęcia konferencji",
      endDate: "Pole wyboru daty zakończenia konferencji",
      active: "Przełącznik do ustawienia aktywności wydarzenia",
      saveSessionButton: "Przycisk do zapisania konferencji",
    },
    labels: {
      name: "Nazwa*",
      descriptionPl: "Opis w wersji polskiej*",
      descriptionEn: "Opis w wersji angielskiej",
      sessionType: "Typ konferencji*",
      eventBlock: "Blok wydarzenia*",
      location: "Lokacja*",
      room: "Pomieszczenie*",
      speaker: "Prelegent*",
      maxSeats: "Ilość miejsc*",
      startDate: "Data rozpoczęcia*",
      endDate: "Data zakończenia",
    },
    createSessionTypeMessage: "Taki typ nie istnieje, kliknij aby go stworzyć",
    createBlockMessage: "Taki blok nie istnieje, kliknij aby go stworzyć",
    createLocationMessage: "Taka lokacja nie istnieje, kliknij aby ją stworzyć",
    createRoomMessage: "Takie pomieszczenie nie istnieje, kliknij aby je dodać",
    createSpeakerMessage:
      "Taki prelegent nie istnieje, kliknij aby go stworzyć",
    saveSessionButtonTooltip: "Kliknij, aby  zapisać konferencję",
    saveSessionButtonText: "Zapisz",
  },
};

const eventsPageManager = {
  tableColumns: {
    name: "Nazwa",
    active: "Czy aktywe?",
    yes: "Tak",
    no: "Nie",
    startDate: "Data rozpoczęcia",
    noStartDate: "Brak daty rozpoczęcia",
    endDate: "Data zakończenia",
    noEndDate: "Brak daty zakończenia",
    registrationStartDate: "Data rozpoczęcia zapisów",
    noRegistrationStartDate: "Brak daty rozpoczęcia zapisów",
    createdAt: "Data utworzenia",
    noCreatedAt: "Brak daty utworzenia",
    updatedAt: "Data aktualizacji",
    noUpdatedAt: "Brak daty aktualizacji",
  },
  pageHeader: "Panel podglądu wydarzeń",
  addEventButtonTooltip: "Kliknij, aby utworzyć wydarzenie",
  addEventButtonAriaLabel: "Przycisk do utworzenia wydarzenia",
};

const addRoomForm = {
  pageHeading: "Utwórz pomieszczenie",
  submitButtonTooltip: "Kliknij, aby utworzyć pomieszczenie",
  submitButtonText: "Zapisz",
  ariaLabels: {
    roomNumber: "Pole tekstowe z nazwą pomieszczenia",
    capacity: "Pole numeryczne z ilością miejs",
  },
  labels: {
    roomNumber: "Nazwa pomieszczenia*",
    capacity: "Ilość miejsc",
  },
};

const updateLocationForm = {
  ariaLabels: {
    name: "Pole tekstowe z nazwą lokacji",
    street: "Pole tekstowe z ulicą, na której znajduje się lokacja",
    buildingNumber: "Pole tekstowe z numerem budynku lokacji",
    postalCode: "Pole tekstowe z kodem pocztowym lokacji",
    city: "Pole tekstowe z miastem, w którum znajduje się lokacja",
    active: "Przełącznik z aktywnością lokacji",
    submitButton: "Przycisk do zapisania zmian w lokacji",
    cancelButton: "Przycisk do odrzucenia zmian w lokacji",
  },
  labels: {
    name: "Nazwa*",
    street: "Ulica*",
    buildingNumber: "Numer budynku*",
    postalCode: "Kod pocztowy*",
    city: "Miasto*",
  },
  submitButtonTooltip: "Kliknij, aby zapisać zmiany",
  submitButtonText: "Zapisz",
  cancelButtonTooltip: "Kliknij, aby odrzucić zmiany",
  cancelButtonText: "Anuluj",
};

const updateRoomForm = {
  pageHeading: "Zaktualizuj pomieszczenie",
  ariaLabels: {
    roomNumber: "Pole tekstowe z nazwą pomieszczenia",
    capacity: "Pole numeryczne z ilością miejsc",
    active: "Przełącznik z aktywnością lokacji",
    submitButton: "Przycisk do zapisania zmian w pomieszczeniu",
  },
  labels: {
    roomNumber: "Nazwa pomieszczenia*",
    capacity: "Ilość miejsc*",
  },
  submitButtonTooltip: "Kliknij, aby zapisać zmiany",
  submitButtonText: "Zapisz",
};

const locationPage = {
  locationData: {
    name: "Nazwa",
    address: "Adres",
    createdAt: "Data utworzenia",
    noCreatedAt: "Brak daty utworzenia",
    updatedAt: "Data aktualizacji",
    noUpdatedAt: "Brak daty aktualizacji",
    active: "Czy aktywna?",
    yes: "Tak",
    no: "Nie",
  },
  roomData: {
    roomNumber: "Nazwa pomieszczenia",
    capacity: "Ilość miejsc",
    createdAt: "Data utworzenia",
    noCreatedAt: "Brak daty utworzenia",
    updatedAt: "Data aktualizacji",
    noUpdatedAt: "Brak daty aktualizacji",
    active: "Czy aktywne?",
    yes: "Tak",
    no: "Nie",
  },
  ariaLabels: {
    editLocationButton: "Przycisk do edycji danych lokacji",
    addRoomButton: "Przycisk do utworzenia pomieszczenia",
  },
  pageHeading: "Panel zarządzania lokacją",
  locationDataHeading: "Dane o lokacji",
  editLocationButtonTooltip: "Kliknij, aby edytować lokację",
  editLocationButtonText: "Edytuj",
  roomsDataHeading: "Pomieszczenia",
  updateRoomTooltip: "Kliknij, aby edytować pomieszczenie",
  addRoomButtonTooltip: "Kliknij, aby utworzyć pomieszczenie",
  addRoomButtonText: "Utwórz pomieszczenie",
};

const locationsPage = {
  locationDataColumns: {
    name: "Nazwa",
    address: "Adres",
    active: "Czy aktywna?",
    yes: "Tak",
    no: "Nie",
    createdAt: "Data utworzenia",
    noCreatedAt: "Brak daty utworzenia",
    updatedAt: "Data aktualizacji",
    noUpdatedAt: "Brak daty aktualizacji",
  },
  ariaLabels: {
    addLocationButton: "Przycisk do utworzenia lokacji",
  },
  pageHeading: "Panel zarządzania lokacjami",
  addLocationButtonTooltip: "Kliknij, aby utworzyć lokację",
};

const addLocationForm = {
  addRoomForm: {
    ariaLabels: {
      roomNumber: "Pole tekstowe z nazwą pomieszczenia",
      capacity: "Pole numeryczne z ilością miejsc",
      saveRoomButton: "Przycisk do zapisania zmian pomieszczenia",
      removeRoomButton: "Przycisk do usunięcia pomieszczenia",
    },
    labels: {
      roomNumber: "Nazwa pomieszczenia",
      capacity: "Ilość miejsc",
    },
    saveRoomButtonTooltip: "Kliknij, aby zapisać pomieszczenie",
    removeRoomButtonTooltip: "Kliknij, aby usunąć pomieszczenie",
  },
  addRoomSuccess: "Nowe pomieszczenie zostało dodane",
  removeRoomSuccess: "Pomieszczenie zostało usunięte",
  saveRoomSuccess: "Pomieszczeni zostało zaktualizowane",
  pageHeading: "Dodaj lokację",
  buildingDataHeading: "Dane o budynku",
  ariaLabels: {
    name: "Pole tekstowe z nazwą budynku",
    street: "Pole tekstowe z nazwą ulicy, na której znajduje się budynek",
    buildingNumber: "Pole tekstowe z numerem budynku",
    postalCode: "Pole tekstowe z numerem pocztowym budynku",
    city: "Pole tekstowe z miastem, w którym znajduje się budynek",
    addRoomButton: "Przycisk do utworzenia pomieszczenia",
    submitButton: "Przycisk do utworzenia lokacji",
  },
  labels: {
    name: "Nazwa budynku*",
    street: "Nazwa ulicy*",
    buildingNumber: "Numer budynky*",
    postalCode: "Kod pocztowy*",
    city: "Miasto*",
  },
  roomsDataHeading: "Pomieszczenia",
  addRoomButtonTooltip: "Kliknij, aby dodać pomieszczenie",
  noRooms: "Budynek nie posiada utworzonych pomieszczeń",
  submitButtonTooltip: "Kliknij, aby utworzyć lokację",
  submitButtonText: "Utwórz",
};

const sessionTypePage = {
  pageHeading: "Typy konferencji",
  addSessionTypeHeading: "Dodaj typ",
  ariaLabels: {
    sessionTypeName: "Pole tekstowe z nazwą nowo tworzonego typu konferencji",
    addNewSessionTypeButton: "Przycisk do utworzenia nowego typu konferencji",
  },
  labels: {
    sessionTypeName: "Nazwa nowego typu*",
  },
  addNewSessionTypeButtonTooltip: "Kliknij, aby utworzyć nowy typ konferencji",
  sessionTypeRowTooltip: "Kliknij, aby edytować typ konferencji",
  noSessionTypes: "Brak typów konferencji",
  tableColumns: {
    name: "Nazwa",
    createdAt: "Data utworzenia",
    updatedAt: "Data aktualizacji",
    active: "Czy aktywny?",
    options: "Opcje",
  },
  onCreatedAt: "Brak daty utworzenia",
  noUpdatedAt: "Brak daty aktualizacji",
  yes: "Tak",
  no: "Nie",
  updateFormHeading: "Edytuj typ konferencji",
};

const organizationPage = {
  pageHeading: "Organizacje prelegentów",
  addOrganizationHeading: "Dodaj organizację",
  ariaLabels: {
    organizationName: "Pole tekstowe z nazwą nowo tworzonej organizacji",
    addOrganizationButton: "Przycisk do utworzenia nowegj organizacji",
  },
  labels: {
    organizationName: "Nazwa nowej organizacji*",
  },
  addNewOrganizationButtonTooltip: "Kliknij, aby utworzyć nową organizację",
  organizationRowTooltip: "Kliknij, aby edytować organizację",
  noOrganizations: "Brak typów organizacji",
  tableColumns: {
    name: "Nazwa",
    createdAt: "Data utworzenia",
    updatedAt: "Data aktualizacji",
    active: "Czy aktywny?",
    options: "Opcje",
  },
  onCreatedAt: "Brak daty utworzenia",
  noUpdatedAt: "Brak daty aktualizacji",
  yes: "Tak",
  no: "Nie",
  updateFormHeading: "Edytuj organizację",
};

const speakerTitlePage = {
  pageHeading: "Tytuły prelegentów",
  addSpeakerTitleHeading: "Dodaj tytuł",
  ariaLabels: {
    speakerTitleName: "Pole tekstowe z nazwą nowo tworzonego tytułu prelegenta",
    addNewSpeakerTitleButton: "Przycisk do utworzenia nowego tytułu prelegenta",
  },
  labels: {
    speakerTitleName: "Nazwa nowego tytułu*",
  },
  addNewSpeakerTitleButtonTooltip:
    "Kliknij, aby utworzyć nowy tytuł prelegenta",
  speakerTitleRowTooltip: "Kliknij, aby edytować tytuł prelegenta",
  noSpeakerTitles: "Brak tytułów prelegenta",
  tableColumns: {
    name: "Nazwa",
    createdAt: "Data utworzenia",
    updatedAt: "Data aktualizacji",
    active: "Czy aktywny?",
    options: "Opcje",
  },
  onCreatedAt: "Brak daty utworzenia",
  noUpdatedAt: "Brak daty aktualizacji",
  yes: "Tak",
  no: "Nie",
  updateFormHeading: "Edytuj tytuł prelegenta",
};

const speakersPage = {
  tableColumns: {
    personalData: "Dane personalne",
    active: "Czy aktywny?",
    yes: "Tak",
    no: "Nie",
    createdAt: "Data utworzenia",
    noCreatedAt: "Brak daty utworzenia",
    updatedAt: "Data aktualizacji",
    noUpdatedAt: "Brak daty aktualizacji",
  },
  ariaLabels: {
    addSpeakerButton: "Przycisk do utworzenia nowego prelegenta",
  },
  pageHeading: "Panel zarządzania prelegentami",
  speakerTableEntryTooltip: "Kliknij, aby wyświetlić dane o prelegencie",
  addSpeakerButtonTooltip: "Kliknij, aby utworzyć prelegenta",
};

const updateOtherParamForm = {
  dataHeading: "Dane",
  ariaLabels: {
    name: "Pole tekstowe z nazwą parametru",
    active: "Przełącznik do ustawiania aktywności parametru",
    submitButton: "Przycisk do zapisania zmian",
  },
  labels: {
    name: "Nazwa*",
  },
  submitButtonTooltip: "Kliknij, aby zapisać zmiany",
  submitButtonText: "Zapisz",
  activeHeading: "Aktywność",
};

const otherPage = {
  pageHeading: "Konfiguracja pozostałych parametrów",
  speakerTitleHeading: "Tytuły prelegentów",
  organizationsHeading: "Organizacje prelegentów",
  speakerTypeHeading: "Typy konferencji",
};

const updateSpeakerForm = {
  ariaLabels: {
    firstName: "Pole tekstowe z imieniem prelegenta",
    lastName: "Pole tekstowe z nazwiskiem prelegenta",
    speakerTitle: "Pole wyboru tytułu naukowego prelegenta",
    organizaton: "Pole wyboru organizacji prelegenta",
    email: "Pole tekstowe z adresem e-mail prelegenta",
    backupEmail: "Pole tekstowe z zapasowym adresem e-mail prelegenta",
    submitButton: "Przycisk do zapisu zmian w prelegencie",
    cancelButton: "Przycisk do odrzucenia zmian w prelegencie",
  },
  labels: {
    firstName: "Imię*",
    lastName: "Nazwisko*",
    speakerTitle: "Tytuł naukowy",
    organization: "Organizacja",
    email: "Adres e-mail*",
    backupEmail: "Zapasowy adres e-mail",
  },
  speakerTitleCreateLabel:
    "Taki tytuł naukowy nie istnieje, kliknij aby go stworzyć",
  organizationCreateLabel:
    "Taka organizacja nie istnieje, kliknij aby ją stworzyć",
  activeHeading: "Aktywność",
  submitButtonTooltip: "Kliknij, aby zapisać zmiany",
  submitButtonText: "Zapisz",
  cancelButtonTooltip: "Kliknij, aby odrzucić zmiany",
  cancelButtonText: "Anuluj",
};

const speakerPage = {
  columnRows: {
    none: "Brak",
    personalData: "Dane personalne",
    email: "Adres e-mail",
    backupEmail: "Zapasowy adres e-mail",
    organization: "Organizacja",
    createdAt: "Data utworzenia",
    noCreatedAt: "Brak daty utworzenia",
    updatedAt: "Data aktualizacji",
    noUpdatedAt: "Brak daty aktualizacji",
    active: "Czy aktywny?",
    yes: "Tak",
    no: "Nie",
  },
  ariaLabels: {
    updateSpeakerButton: "Przycisk do edycji danych prelegenta",
  },
  pageHeading: "Panel zarządzania prelegentem",
  dataHeading: "Dane o prelegencie",
  updateSpeakerButtonTooltip: "Kliknij, aby edytować prelegenta",
  updateSpeakerButtonText: "Edytuj",
};

const addSessionForm = {
  pageHeading: "Utwórz konferencję",
  ariaLabels: {
    name: "Pole tekstowe z nazwą konferencji",
    descriptionPl: "Pole tekstowe z opisem konferencji w wersji polskiej",
    descriptionEn: "Pole tekstowe z opisem konferencji w wersji angielskiej",
    sessionType: "Pole wyboru typu konferencji",
    eventBlock: "Pole wyboru bloku wydarzenia, do którego należy konferencja",
    location: "Pole wyboru lokacji, w której odbywać się będzie konferencja",
    room: "Pole wyboru pomieszczenia, w którym odbywać się będzie konferencja",
    speaker: "Pole wyboru prelegenta, który będzie prowadził konferencję",
    maxSeats: "Pole numeryczne z ilością miejsc na konferencję",
    startDate: "Pole wyboru daty rozpoczęcia konferencji",
    endDate: "Pole wyboru daty zakończenia konferencji",
    submitButton: "Przycisk do utworzenia konferencji"
  },
  labels: {
    name: "Nazwa konferencji*",
    descriptionPl: "Opis w wersji polskiej*",
    descriptionEn: "Opis w wersji angielskiej",
    sessionType: "Typ konferencji*",
    eventBlock: "Blok wydarzenia*",
    location: "Lokacja*",
    room: "Pomieszczenie*",
    speaker: "Prelegent*",
    maxSeats: "Ilość miejsc*",
    startDate: "Data rozpoczęcia*",
    endDate: "Data zakończenia",
  },
  sessionTypeCreateLabel: "Taki typ nie istnieje, kliknij aby go stworzyć",
  eventBlockCreateLabel: "Taki blok nie istnieje, kliknij aby go stworzyć",
  locationCreateLabel: "Taka lokacja nie istnieje, kliknij aby ją stworzyć",
  roomCreateLabel: "Takie pomieszczenie nie istnieje, kliknij aby je stworzyć",
  speakerCreateLabel: "Taki prelegent nie istnieje, kliknij aby go stworzyć",
  submitButtonTooltip: "Kliknij, aby utworzyć prelegenta",
  sutmitButtonText: "Utwórz"
};

export default {
  eventImage,
  createEventPage,
  eventPageManager,
  styledSwitch,
  eventsPageManager,
  filterParams,
  addRoomForm,
  updateLocationForm,
  updateRoomForm,
  locationPage,
  locationsPage,
  addLocationForm,
  sessionTypePage,
  speakersPage,
  organizationPage,
  speakerTitlePage,
  updateOtherParamForm,
  otherPage,
  updateSpeakerForm,
  speakerPage,
  addSessionForm,
} as const;

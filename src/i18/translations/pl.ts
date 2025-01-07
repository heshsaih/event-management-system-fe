const accountsPage = {
  pageHeading: "Panel zarządzania użytkownikami",
  tableData: {
    personalData: "Dane personalne",
    lastSuccessfulLogin: "Czas ostatniej udanej próby logowania",
    createdAt: "Data utworzenia",
    updatedAt: "Data aktualizacji",
    active: "Czy aktywny?",
    yes: "Tak",
    no: "Nie",
    noDate: "Brak daty"
  },
  ariaLabels: {
    tableEntry: "Wpis w liście użytkowników o wartości "
  },
  accountTableEntryTooltip: "Kliknij, aby wyświetlić dane o użytkowniku",
};

const loginPage = {
  pageHeading: "Zaloguj się",
  pageBody: "Do uwierzytelnienia w systemie potrzebne jest aktywne konto Google. Kliknij przycisk poniżej, aby uwierzytelnić się w systemie za jego pomocą",
  loginButtonAriaLabel: "Przycisk do uwierzytelnienia się w systemie",
  loginButtonTooltip: "Kliknij, aby się uwierzytelnić",
  loginButtonText: "Zaloguj się za pomocą konta Google"
};

const eventPageParticipant = {
  pageHeading: "Podgląd wydarzenia",
  eventDataHeading: "Informacje o wydarzeniu",
  sessionsDataHeading: "Konferencje",
  noSessions: "Wydarzenie nie posiada konferencji",
  eventTable: {
    name: "Nazwa wydarzenia",
    descriptionPl: "Opis w wersji polskiej",
    descriptionEn: "Opis w wersji angielskiej",
    startDate: "Data rozpoczęcia",
    endDate: "Data zakończenia",
    noDate: "Brak daty",
  },
  sessionTableRow: {
    name: "Nazwa konferencji",
    descriptionPl: "Opis w wersji polskiej",
    descriptionEn: "Opis w wersji angielskiej",
    startDate: "Data rozpoczęcia",
    endDate: "Data zakończenia",
    noDate: "Brak daty",
    location: "Miejsce odbywania konferencji",
    address: "Adres lokacji",
    maxSeats: "Ilość miejsc",
    availableSeats: "Pozostałe miejsca",
    speaker: "Prelegent",
    sessionType: "Typ konferencji",
    eventBlock: "Blok konferencji",
    room: "Pomieszczenie",
    building: "budynek",
  },
  sessionAvailableSeats: "Ilość miejsc: "
};

const eventsPageParticipant = {
  tableColumns: {
    name: "Nazwa wydarzenia",
    startDate: "Data rozpoczęcia",
    endDate: "Data zakończenia",
    noDate: "Brak daty",
  },
  ariaLabels: {
    tableEntry: "Wpis w liście wydarzeń o nazwie ",
  },
  pageHeaading: "Wydarzenia",
  noTableEntries: "W tej chwili nie odbywają się żadne wydarzenia",
  tableEntryTooltip: "Kliknij, aby wyświetlić dane o wydarzeniu",
};

const dataHooks = {
  account: {
    addRoleSuccess: "Nowa rola została nadana pomyślnie",
    removeRoleSuccess: "Rola została odebrana pomyślnie",
    changeActiveSuccess: "Status użytkownika został zmieniony pomyślnie"
  },
  emailNotification: {
    createSuccess:
      "Nowy szablon powiadomień mailowych został utworzony pomyślnie",
    updateSuccess:
      "Szablon powiadomień mailowych został zaktualizowany pomyślnie",
  },
  event: {
    createSuccess: "Nowe wydarzenie zostało utworzone pomyślnie",
    updateSuccess: "Wydarzenie zostało zaktualizowane pomyślnie",
    changeActiveSuccess: "Status wydarzenia został zmieniony pomyślnie",
  },
  eventBlock: {
    createSuccess: "Nowy blok wydarzenia został utworzony pomyślnie",
  },
  location: {
    createSuccess: "Nowa lokacja została utworzona pomyślnie",
    updateSuccess: "Lokacja została zaktualizowana pomyślnie",
    changeActiveSuccess: "Status lokacji został zmieniony pomyślnie",
  },
  organization: {
    createSuccess: "Nowa lokacja została utworzona pomyślnie",
    updateSuccess: "Organizacja została zaktualizowana pomyślnie",
    changeActiveSuccess: "Status organizacji został zmieniony pomyślnie",
  },
  room: {
    createSuccesss: "Nowe pomieszczenie zostało utworzone pomyślnie",
    updateSuccess: "Pomieszczenie zostało zaktualizowane pomyślnie",
    changeActiveSuccess: "Status pomieszczenia został zmieniony pomyślnie",
  },
  session: {
    createSuccess: "Nowa konferencja została utworzona pomyślnie",
    updateSuccess: "Konferencja została zaktualizowana pomyślnie",
    changeActiveSuccess: "Status konferencji został zmieniony pomyślnie",
  },
  sessionType: {
    createSuccess: "Nowy typ konferencji został utworzony pomyślnie",
    updateSuccess: "Typ konferencji został zaktualizowany pomyślnie",
    changeActiveSuccess: "Status typu konferencji został zmieniony pomyślnie",
  },
  speaker: {
    createSuccess: "Nowy prelegent został utworzony pomyślnie",
    updateSuccess: "Prelegent został zaktualizowany pomyślnie",
    changeActiveSuccess: "Status prelegenta został zmieniony pomyślnie",
  },
  speakerTitle: {
    createSuccess: "Nowy tytuł prelegenta został utworzony pomyślnie",
    updateSuccess: "Tytuł prelegenta został zaktualizowany pomyślnie",
    changeActiveSuccess: "Status tytułu prelegenta został zmieniony pomyślnie",
  },
};

const readFileModal = {
  sessionsData: {
    pageHeading: "Wczytaj dane konferencji",
    readDataHeading: "Wczytane dane",
    instruction: {
      intro:
        "Przykładowy plik .csv o poprawniej strukturze można pobrać przy pomocy przycisku poniżej. Składa się on z nagłówka i wierszy z danymi. Nagłówek pliku musi zostać taki sam, natomiast dane odnośnie konferencji powinny być umieszczone w kolejnych wierszach, po 1 wierszu na konferencję. Opis poszczególnych kolumn w pliku:",
      name: "nazwa_konferencji: Nazwa konferencji (długość od 2 do 64 znaków)",
      descriptionPl:
        "opis_pl: Opis w wersji polskiej (długość od 2 do 2000 znaków)",
      descriptionEn:
        "opis_en: Opis w wersji angielskiej (jest opcjonalny, w celu usunięcia opisu należy usunąć domyślną wartość, zostawiając przecinki)",
      sessionType:
        'typ_konferencji: Identyfikator odpowiadający jednemu z typów konferencji dodanych w systemie (można go zdobyć w panelu "Zarządzanie pozostałymi parametrami" w zakładce "Typy konferencji" poprzez kliknięcie na wybrany typ i skopiowanie identyfikatora)',
      sessionBlock:
        "blok_wydarzenia: Blok, do którego należeć będzie konferencja (długość od 2 do 64 znaków; Zostawiając wartość pustą, konferencja zostanie przypisana do domyślnego bloku)",
      room: 'pomieszczenie: Identyfikator odpowiadający jednemu z pomieszczeń dodanych w systemie (można go zdobyć w panelu "Zarządzanie lokacjami" poprzez wybranie z listy odpowiedniej lokacji, z widoku lokacji odszukanie odpowiedniego pomieszczenia i skopiowania jego identyfikatora)',
      speaker:
        'prelegent: Identyfikator odpowiadający jednemu z prelegentów dodanych w systemie (można go zdobyć w panelu "Zarządzanie prelegentami" poprzez wybranie z listy odpowiedniego prelegenta i z poziomu widoku prelegenta skopiowanie jego identyfikatora)',
      maxSeats:
        "ilosc_miejsc: Liczba określająca ilość miejsc w konferencji dla uczestników (liczba musi być większa od 0)",
      minutesBeforeSignUpCloses:
        "czas_zakonczenia_zapisow: Liczba podana w minutach, reprezentująca, ile minut przed rozpoczęciem konferencji, zapisy na nią mają się zamknąć (liczba musi być więszka od 0)",
      startTime:
        "data_rozpoczęcia: Data rozpoczęcia konferencji (podana w formacie określonym przez standard ISO 8601)",
      endTime:
        "data_zakonczenia: Data zakończenia konferencji (podana w formacie określonym przez standard ISO 8601)",
    },
    ariaLabels: {
      downloadExampleButton:
        "Przycisk do pobrania przykładowego pliku CSV do wczytania danych",
      submitButton: "Przycisk do potwierdzenia poprawności danych",
      cancelButton: "Przycisk do odrzucenia danych",
    },
    tableKeys: {
      name: "Nazwa konferencji",
      descriptionPl: "Opis w wersji polskiej",
      descriptionEn: "Opis w wersji angielskiej",
      sessionType: "Typ konferencji",
      sessionBlock: "Blok wydarzenia",
      room: "Pomieszczenie",
      location: "Lokacja",
      speaker: "Prelegent",
      maxSeats: "Ilość miejsc",
      minutesBeforeSignUpCloses:
        "Czas do zakończenia zapisów od rozpoczęcia konferencji",
      startTime: "Data rozpoczęcia",
      endTime: "Data zakończenia",
      wrongDateFormat:
        "Format daty był niepoprawny, wartość zostanie ustawiona na datę teraźniejszą",
      yes: "Tak",
      no: "Nie",
      wrongNumberFormat:
        "Została podana niepoprawna liczba, wartość zostanie ustawiona na 15",
      emptyValue:
        "Wartość nie została podana, zostanie zastąpioną pustym tekstem",
      valueNotFound:
        "Wartość o tym indentyfikatorze nie została odnaleziona, zostanie zastąpiona pustą wartośćią",
      emptySessionBlock:
        "Wartość nie została podana, zostanie nadpisana domyślnym blokiem",
    },
    downloadExampleButtonTooltip: "Kliknij, aby pobrać przykład",
    downloadExampleButtonText: "Pobierz przykładowy plik",
    submitButtonTooltip: "Kliknij, aby wczytać dane",
    isDataCorrect: "Czy dane są poprawne?",
    submitButtonText: "Tak",
    cancelButtonTooltip: "Kliknij, aby odrzucić dane",
    cancelButtonText: "Nie",
    loadFileButtonText: "Wczytaj plik",
  },
  eventData: {
    pageHeading: "Wczytaj dane wydarzenia",
    readDataHeading: "Wczytane dane",
    instruction: {
      intro:
        "Przykładowy plik .csv o poprawniej strukturze można pobrać przy pomocy przycisku poniżej. Składa się on z dwóch wierszy: nagłówka i wiersza z danymi. Nagłówek pliku musi zostać taki sam, natomiast dane zawarte w 2 wierszu należy podmienić prawdziwymi informacjami. Opis poszczególnych kolumn w pliku:",
      name: "nazwa_wydarzenia: Nazwa wydarzenia (długość od 2 do 64 znaków)",
      descriptionPl:
        "opis_pl: Opis w wersji polskiej (długość od 2 do 2000 znaków)",
      descriptionEn:
        "opis_en: Opis w wersji angielskiej (jest opcjonalny, w celu usunięcia opisu należy usunąć domyślną wartość, zostawiając przecinki)",
      minutesBetweenSessions:
        "przerwa_pomiedzy_konferencjami: Przerwa czasowa pomiędzy konferencjami w wydarzeniu (liczba większa od 0)",
      startDate:
        "data_rozpoczęcia: Data rozpoczęcia wydarzenia (podana w formacie określonym przez standard ISO 8601)",
      endDate:
        "data_zakonczenia: Data zakończenia wydarzenia (podana w formacie określonym przez standard ISO 8601)",
      registrationStartDate:
        "data_rozpoczecia_zapisow: Data, od której wydarzenie będzie widoczne dla uczestników do zapisania się (podana w formacie określonym przez standard ISO 8601)",
      outsidersAllowed:
        'wstep_spoza_politechniki: Wartość określająca, czy uczestnicy niebędący pracownikami/studentami Politechniki Łódzkiej będą mogli zapisać się na wydarzenie (cyfra 1 dla "tak", cyfra 0 dla "nie")',
    },
    ariaLabels: {
      downloadExampleButton:
        "Przycisk do pobrania przykładowego pliku CSV do wczytania danych",
      submitButton: "Przycisk do potwierdzenia poprawności danych",
      cancelButton: "Przycisk do odrzucenia danych",
    },
    tableKeys: {
      name: "Nazwa wydarzenia",
      descriptionPl: "Opis wydarzenia w wersji polskiej",
      descriptionEn: "Opis wydarzenia w wersji angielskiej",
      startDate: "Data rozpoczęcia wydarzenia",
      endDate: "Data zakończenia wydarzenia",
      registrationStartDate: "Data rozpoczęcia zapisów na wydarzenie",
      outsidersAllowed: "Wstęp dla uczestników spoza Politechinki?",
      minutesBetweenSessions:
        "Przerwa czasowa pomiędzy konferencjami (w minutach)",
      wrongDateFormat:
        "Format daty był niepoprawny, wartość zostanie ustawiona na datę teraźniejszą",
      yes: "Tak",
      no: "Nie",
      wrongNumberFormat:
        "Została podana niepoprawna liczba, wartość zostanie ustawiona na 15",
      emptyValue:
        "Wartość nie została podana, zostanie zastąpioną pustym tekstem",
    },
    downloadExampleButtonTooltip: "Kliknij, aby pobrać przykład",
    downloadExampleButtonText: "Pobierz przykładowy plik",
    submitButtonTooltip: "Kliknij, aby wczytać dane",
    isDataCorrect: "Czy dane są poprawne?",
    submitButtonText: "Tak",
    cancelButtonTooltip: "Kliknij, aby odrzucić dane",
    cancelButtonText: "Nie",
    loadFileButtonText: "Wczytaj plik",
  },
};

const breadcrumbsLabels = {
  home: "Strona główna",
  events: "Wydarzenia",
  event: "Wydarzenie",
  locations: "Lokacje",
  location: "Lokacja",
  speakers: "Prelegenci",
  speaker: "Prelegent",
  other: "Pozostałe parametry",
  createEvent: "Stwórz wydarzenie",
  accounts: "Użytkownicy",
  account: "Użytkownik"
};
const backendErrors = {
  messages: {
    "Event block in session does not exist in event":
      "Podany blok wydarzenia nie istnieje w tym wydarzeniu",
    "Received data contains duplicate names":
      "Przesłane dane posiadają zduplikowane nazwy",
    "Received data contains duplicate emails":
      "Przesłane dane posiadają zduplikowane adresy e-mail",
    "Registration date must be before event start date":
      "Data rozpoczęciazapisów na wydarzenie musi być przed datą rozpoczęcia wydarzenia",
    "Start date must be before end date":
      "Data rozpoczęcia wydarzenia musi być przed datą zakończenia wydarzenia",
    "Session dates outside event dates":
      "Przynajmniej jedna konferencja ma datę spoza czasu trwania wydarzenia",
    "Email template contains forbidden keyword default":
      "Szablon powiadomienia e-mail zawiera niedopuszczalne słowa kluczowe",
    "Received data contains duplicate ids":
      "Przesłane dane posiadają zduplikowane identyfikatory",
    "Received data contains duplicate ids: ":
      "Przesłane dane posiadają zduplikowane identyfikatory",
    "Speaker with given email already exists":
      "Prelegent z podanym adresem e-mail już istnieje",
    "Session with given name already exists":
      "Konferencja z podaną nazwą już istnieje",
    "Event block with given name already exists":
      "Blok wydarzenia o podanej nazwie już istnieje",
    "Room with given name already exists in that location":
      "Pomieszczenie z podaną nazwą już istnieje w tej lokacji",
    "Event with given name already exists":
      "Wydarzenie o podanej nazwie już istnieje",
    "Email template with given name already exists":
      "Szablon powiadomienia e-mail o podanej nazwie już istnieje",
    "event id cannot be null": "Wydarzenie jest wymagane",
    "location id cannot be null": "Lokacja jest wymagana",
    "session type id cannot be null": "Typ konferencji jest wymagany",
    "session id cannot be null": "Konferencja jest wymagana",
    "speaker title cannot be null": "Tytuł prelegenta jest wymagany",
    "organization id cannot be null": "Organizacja prelegenta jest wymagana",
    "speaker id cannot be null": "Prelegent jest wymagany",
    "room id cannot be null": "Pomieszczenie jest wymagane",
    "Max seats cannot be null": "Ilość miejsc jest wymagana",
    "Event block id cannot be null": "Blok wydarzenia jest wymagany",
    "Minutes before sign up closes cannot be null":
      "Ilość minut przed zamknięciem zapisów jest wymagany",
    "Minutes before sign up closes must be higher than 0":
      "Ilość minut przed zamknięciem zapisów musi być większa od 0",
    "Name cannot be empty": "Nazwa jest wymagana",
    "Name must be between 2 and 64 characters":
      "Nazwa musi posiadać od 2 do 64 znaków",
    "DescriptionPl must have between 2 and 2000 characters":
      "Opis w wersji polskiej musi być posiadać od 2 do 2000 znaków",
    "DescriptionEn must have between 2 and 2000 characters":
      "Opis w wersji angielskiej musi posiadać od 2 do 2000 znaków",
    "DescriptionPl cannot be blank": "Opis w wersji polskiej jest wymagany",
    "Start date cannot be null": "Czas rozpoczęcia jest wymagany",
    "Start date must take place in the future":
      "Czas rozpoczęcia musi być z przyszłości",
    "End date cannot be null": "Data zakończenia jest wymagana",
    "Registration start date cannot be null":
      "Czas rozpoczęcia rejestracji jest wymagany",
    "Image data cannot be null": "Zdjęcie tematyczne jest wymagane",
    "First name cannot be blank": "Imię prelegenta jest wymagane",
    "First name must be between 2 and 64 characters":
      "Imię prelegenta musi mieć od 2 do 64 znaków",
    "Last name cannot be blank": "Nazwisko prelegenta jest wymagane",
    "Last name must be between 2 and 64 characters":
      "Nazwisko prelegenta musi mieć od 2 do 64 znaków",
    "Title name must be between 2 and 16 characters":
      "Tytuł prelegenta musi mieć od 2 do 16 znaków",
    "Organization name must be between 2 and 64 characters":
      "Organizacja prelegenta musi mieć od 2 do 64 znaków",
    "Outsiders allowed cannot be null":
      "Informacja o możliwości wejścia dla uczestników spoza PŁ jest wymagana",
    "Minutes between different sessions cannot be null":
      "Odstęp pomiędzy konferencjami jest wymagany",
    "Minutes between different can not be less than 0":
      "Odstęp pomiędzy konferencjami musi być więszky od 0",
    "Event block name must be between 2 and 64 characters":
      "Nazwa bloku wydarzenia musi mieć od 2 do 64 znakó",
    "Building number cannot be blank": "Numer budynku jest wymagany",
    "Building number must be between 1 and 16 characters":
      "Numer budynku musi mieć od 1 do 16 znakó",
    "Street cannot be blank": "Nazwa ulicy jest wymagana",
    "Street must be between 2 and 64 characters":
      "Nazwa ulicy musi mieć od 2 do 64 znaków",
    "City cannot be blank": "Nazwa miasta jest wymagana",
    "City must be between 2 and 64 characters":
      "Nazwa miastamusi mieć od 2 do 64 znaków",
    "Postal code cannot be blank": "Kod pocztowy jest wymagany",
    "Postal code must have 6 characters":
      "Kod pocztowy musi mieć dokładnie 6 znaków (w formacie XX-XXX)",
    "Room number cannot be blank": "Numer pomieszczenia jest wymagany",
    "Room number must be between 1 and 16 characters":
      "Numer pomieszczenia musi mieć od 1 do 16 znaków",
    "Capacity cannot be null": "Ilość miejsc w pomieszczeniu jest wymagana",
    "Capacity must be higher than 0":
      "Ilość miejsc w pomieszczeniu musi być większa od 0",
    "Subject cannot be blank": "Temat powiadomienia mailowego jest wymagany",
    "Subject must be between 2 and 64 characters":
      "Temat powiadomienia mailowego musi mieć od 2 do 64 znaków",
    "Content prefix must be between 2 and 255 characters":
      "Przedrostek powiadomienia mailowego musi mieć od 2 do 255 znaków",
    "Content suffix must be between 2 and 255 characters":
      "Przyrostek powiadomienia mailowego musi mieć od 2 do 255 znaków",
    "Invalid ETag": "Aktualnie wyświetlane dane są nieaktualne, odśwież stronę",
    "Account not found": "Konto nie zostało odnalezione",
    "Session type not found": "Konferencja nie została odnaleziona",
    "Room not found": "Pomieszczenie nie zostało odnalezione",
    "Speaker not found": "Prelegent nie został odnaleziony",
    "Organization not found": "Organizacja prelegenta nie została odnaleziona",
    "Location not found": "Lokacja nie została odnaleziona",
    "Session not found": "Konferencja nie została odnaleziona",
    "Event not found": "Wydarzenie nie zostało odnalezione",
    "Event block not found": "Blok wydarzenia nie został odnaleziony",
    "email template not found":
      "Szablon powiadomienia mailowego nie został odnaleziony",
    "Survey email template not found":
      "Szablon powiadomienia mailowego nie został odnaleziony",
    "Session sign up email template not found":
      "Szablon powiadomienia mailowego nie został odnaleziony",
    "Session reminder email template not found":
      "Szablon powiadomienia mailowego nie został odnaleziony",
    "Unknown error": "Coś poszło nie tak",
    "Connection Error":
      "Nie udało połączyć się z serwerem, spróbuj ponownie później",
    "Email template contains forbidden keyword: default":
      "Podane dane posiadają zabrionione słowo kluczowe: default",
  },
  titles: {
    "Not Found": "Nie znaleziono",
    "Bad Request": "Błędne żądanie",
    Conflict: "Konflikt",
    "Precondition Failed": "Nieaktualne dane",
    "Internal Server Error": "Coś poszło nie tak",
    "Connection Error": "Brak połączenia",
  },
};

const filterParams = {
  ariaLabels: {
    submitButton: "Przycisk do zatwierdzenia opcji filtrowania",
    clearButton: "Przycisk do wyczyszczenia opcji filtrowania",
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
  clearbuttonTooltip: "Kliknij, aby wyczyścić opcje filtrowania",
  clearButtonText: "Wyczyść",
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
  mailTemplates: {
    pageHeading: "Zmień powiadomienia mailowe dla wydarzenia",
    defaultTemplate: "Domyślne",
    noTemplate: "Brak",
    chosenTemplate: "Wybrane",
    signUpHeading: "Powiadomienie o zapisaniu się na wydarzenie",
    reminderHeading: "Przypomnienie o nadchodzącym wydarzeniu",
    surveyHeading: "Prośba o wypełnienie ankiety po wydarzeniu",
    ariaLabels: {
      signUpAutocomplete:
        "Pole wyboru szablonu powiadomienia mailowego o zapisie na konferencje",
      surveyAutocomplete:
        "Pole wyboru szablonu powiadomienia mailowego o ankiecie",
      reminderAutocomplete:
        "Pole wyboru szablonu powiadomienia mailowego o nadchodzącym wydarzeniu",
      nextStepButton:
        "Przycisk do przejścia do kolejnego etapu tworzenia wydarzenia",
      previousStepButton:
        "Przycisk do przejścia do poprzedniego etapu tworzenia wydarzenia",
    },
    labels: {
      signUpAutocomplete: "Powiadomienie o zapisaniu się",
      surveyAutocomplete: "Prośba o wypełnienie ankiety po wydarzeniu",
      reminderAutocomplete: "Przypomnienie o nadchodzącym wydarzeniu",
    },
    nextStepButtonTooltip: "Kliknij, aby przejść do następnego kroku",
    nextStepButtonText: "Dalej",
    previousStepButtonTooltip: "Kliknij, aby wrócić do poprzedniego kroku",
    previousStepButtonText: "Powrót",
  },
  createSessions: {
    ariaLabels: {
      deleteAllSessionsButton:
        "Przycisk do usunięcia wszystkich konferencji z wydarzenia",
      previousStepButton:
        "Przycisk do przejścia do poprzedniego etapu tworzenia wydarzenia",
      nextStepButton:
        "Przycisk do przejścia do kolejnego etapu tworzenia wydarzenia",
      addNewSessionButton:
        "Przycisk do utworzenia nowej konferencji w wydarzeniu",
      loadFileButton: "Przycisk do wczytania danych o konferencjach z pliku",
    },
    newSessionName: "Nowa konferencja",
    newSessionCreateSuccess: "Nowa konferencja została utworzona",
    pageHeader: "Dodaj konferencje",
    deleteAllSessionsButtonTooltip: "Kliknij, aby wyczyścić listę konferencji",
    deleteAllSessionsSuccess: "Konferencje z tego wydarzenia zostały usunięte",
    addNewSessionButtonToolTip: "Kliknij, aby dodać nową konferencję",
    noSessionsPresentMessage: "Wydarzenie nie posiada żadnych konferencji",
    previousStepButtonTooltip: "Kliknij, aby wrócić do poprzedniego kroku",
    previousStepButtonText: "Powrót",
    nextStepButtonTooltip: "Kliknij, aby przejść do kolejnego kroku",
    nextStepButtonText: "Dalej",
    loadFileButtonTooltip: "Kliknij, aby wczytać dane z pliku",
  },
  eventForm: {
    validation: {
      nameTooShort: "Nazwa wydarzenia musi być dłuższa niż 2 znaki",
      nameTooLong: "Nazwa wydarzenia nie może być dłuższa niż 64 znaki",
      descriptionPlTooShort:
        "Opis wydarzenia w wersji polskiej musi być dłuższy niż 2 znaki",
      descriptionPlTooLong:
        "Opis wydarzenia w wersji polskiej nie może być dłuższy niż 2000 znaków",
      minutesBetweenSessionsTooLow:
        "Przerwa pomiędzy konferencjami musi być większa od 0",
      startDateBeforeEndDate:
        "Data rozpoczęcia wydarzenia musi być przed datą jego zakończenia",
      endDateAfterStartDate:
        "Data zakończenia wydarzenia musi być przed datą jego rozpoczęcia",
      registrationStartDateBeforeStartDate:
        "Data roczpoczęcia zapisów na wydarzenie musi być przed jego rozpoczęciem",
    },
    ariaLabels: {
      readFromFileButton: "Przycisk do wczytania danych o wydarzeniu z pliku",
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
    readFromFileButtonTooltip: "Kliknij, aby wczytać dane z pliku",
    readFromFileButtonText: "Wczytaj dane z pliku",
  },
  sessionForm: {
    validation: {
      nameTooShort: "Nazwa musi być dłuższa niż 2 znaki",
      nameTooLong: "Nazwa nie może być dłuższa niż 64 znaki",
      descriptionPlTooShort:
        "Opis w wersji polskiej musi być dłuższy niż 2 znaki",
      descriptionPlTooLong:
        "Opis w wersji polskiej nie może być dłuższy niż 2000 znaków",
      descriptionEnTooShort:
        "Opis w wersji angielskiej musi być dłuższy niż 2 znaki",
      descriptionEnTooLong:
        "Opis w wersji angielskiej nie może być dłuższy niż 2000 znaków",
      sessionTypeRequired: "Typ konferencji jest wymagany",
      eventBlockRequired: "Blok wydarzenia jest wymagany",
      locationRequired: "Lokacja jest wymagana",
      roomRequired: "Pomieszczenie jest wymagane",
      speakerRequired: "Prelegent jest wymagany",
      maxSeatsTooLow: "Ilość miejsc musi być większa od 0",
      startDateBeforeEndDate:
        "Data rozpoczęcia musi być przed datą zakończenia",
      endDateAfterStartDate: "Data zakończenia musi być po dacie rozpoczęcia",
      minuteBeforeSignUpCloseTooLow:
        "Czas do zakończenia zapisów musi być większy od 0",
    },
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
      minutesBeforeSignUpCloses:
        "Pole numeryczne z czasem w minutach przed którym następuje zakończenie zapisów na konferencję",
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
      minutesBeforeSignUpCloses:
        "Czas zakończenia zapisów przed rozpoczęciem konferencji (w minutach)*",
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
      registrationStartDate: "Data rozpoczęcia zapisów",
      outsidersAllowed: "Wstęp dla uczestników spoza Politechniki",
      yes: "Tak",
      no: "Nie",
      minutesBetweenSessions:
        "Odstęp czasowy pomiędzy konferencjami (w minutach)",
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
    emailTemplatesColumns: {
      signUp: "Powiadomienie o zapisaniu się na wydarzenie",
      survey: "Prośba o wypełnienie ankiety po wydarzeniu",
      reminder: "Przypomnienie o nadchodzącym wydarzeniu",
      default: "Domyślne powiadomienie",
      noTemplate: "Brak szablonu powiadomienia",
    },
    pageHeading: "Podsumowanie",
    emailTEmplatesHeading: "Powiadomienia mailowe",
    eventDataHeading: "Dane wydarzenia",
    sessionsDataHeading: "Konferencje",
    previousStepButtonTooltip: "Kliknij, aby wrócić do poprzedniego kroku",
    previousStepButtonText: "Powrót",
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
      minutesBeforeSignUpCloses:
        "Czas od zakończenia zapisów do rozpoczęcia konferencji (w minutach)",
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
    noSessions: "Brak konferencji w tym wydarzeniu",
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
    validation: {
      nameTooShort: "Nazwa wydarzenia musi być dłuższa niż 2 znaki",
      nameTooLong: "Nazwa wydarzenia nie może być dłuższa niż 64 znaki",
      descriptionPlTooShort:
        "Opis wydarzenia w wersji polskiej musi być dłuższy niż 2 znaki",
      descriptionPlTooLong:
        "Opis wydarzenia w wersji polskiej nie może być dłuższy niż 2000 znaków",
      minutesBetweenSessionsTooLow:
        "Przerwa pomiędzy konferencjami musi być większa od 0",
      startDateBeforeEndDate:
        "Data rozpoczęcia wydarzenia musi być przed datą jego zakończenia",
      endDateAfterStartDate:
        "Data zakończenia wydarzenia musi być przed datą jego rozpoczęcia",
      registrationStartDateBeforeStartDate:
        "Data roczpoczęcia zapisów na wydarzenie musi być przed jego rozpoczęciem",
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
    validation: {
      nameTooShort: "Nazwa musi być dłuższa niż 2 znaki",
      nameTooLong: "Nazwa nie może być dłuższa niż 64 znaki",
      descriptionPlTooShort:
        "Opis w wersji polskiej musi być dłuższy niż 2 znaki",
      descriptionPlTooLong:
        "Opis w wersji polskiej nie może być dłuższy niż 2000 znaków",
      descriptionEnTooShort:
        "Opis w wersji angielskiej musi być dłuższy niż 2 znaki",
      descriptionEnTooLong:
        "Opis w wersji angielskiej nie może być dłuższy niż 2000 znaków",
      sessionTypeRequired: "Typ konferencji jest wymagany",
      eventBlockRequired: "Blok wydarzenia jest wymagany",
      locationRequired: "Lokacja jest wymagana",
      roomRequired: "Pomieszczenie jest wymagane",
      speakerRequired: "Prelegent jest wymagany",
      maxSeatsTooLow: "Ilość miejsc musi być większa od 0",
      startDateBeforeEndDate:
        "Data rozpoczęcia musi być przed datą zakończenia",
      endDateAfterStartDate: "Data zakończenia musi być po dacie rozpoczęcia",
      minutesBeforeSignUpClosesTooLow:
        "Czas od zakończenia zapisów do rozpoczęcia konferencji (w minutach)",
    },
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
      minutesBeforeSignUpCloses:
        "Pole numeryczne z czasem od zakończenia zapisów do rozpoczęcia konferencji w minutach",
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
      endDate: "Data zakończenia*",
      minutesBeforeSignUpCloses:
        "Czas od zakończenia zapisów do rozpoczęcia konferencji (w minutach)*",
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
  eventTemplates: {
    pageHeading: "Powiadomienia mailowe",
    signUpTemplateTitle: "Powiadomienie o zapisaniu się na konferencje",
    reminderTemplateTitle: "Przypomnienie o zapisaniu się na wydarzenie",
    surveyTemplateTitle: "Powiadomienie o wypełnienie ankiety",
    ariaLabels: {
      editTemplatesButton:
        "Przycisk do otworzenia formularza do modyfikacji powiadomień mailowych dla wydarzenia",
    },
    editTemplatesButtonTooltip: "Kliknij, aby zmienić powiadomienia mailowe",
    editTemplatesButtonText: "Edytuj",
    eventTemplateEntry: {
      defaultValue: "Domyślny szablon",
      noTemplate: "Brak szablonu powiadomienia",
      table: {
        name: "Nazwa szablonu",
        subject: "Temat maila",
        contentPrefix: "Przedrostek maila",
        contentSuffix: "Przyrostek maila",
      },
    },
  },
  updateEventTemplates: {
    pageHeading: "Zmień powiadomienia mailowe dla wydarzenia",
    defaultTemplate: "Domyślne",
    noTemplate: "Brak",
    chosenTemplate: "Wybrane",
    signUpHeading: "Powiadomienie o zapisaniu się na wydarzenie",
    reminderHeading: "Przypomnienie o nadchodzącym wydarzeniu",
    surveyHeading: "Prośba o wypełnienie ankiety po wydarzeniu",
    ariaLabels: {
      signUpAutocomplete:
        "Pole wyboru szablonu powiadomienia mailowego o zapisie na konferencje",
      surveyAutocomplete:
        "Pole wyboru szablonu powiadomienia mailowego o ankiecie",
      reminderAutocomplete:
        "Pole wyboru szablonu powiadomienia mailowego o nadchodzącym wydarzeniu",
      submitButton:
        "Przycisk do potwierdzenia zmian w powiadomieniach mailowych",
      cancelButton: "Przycisk do odrzucenia zmian w powiadomieniach mailowych",
    },
    labels: {
      signUpAutocomplete: "Powiadomienie o zapisaniu się",
      surveyAutocomplete: "Prośba o wypełnienie ankiety po wydarzeniu",
      reminderAutocomplete: "Przypomnienie o nadchodzącym wydarzeniu",
    },
    submitButtonTooltip: "Kliknij, aby zapisać zmiany",
    submitButtonText: "Zapisz",
    cancelButtonTooltip: "Kliknij, aby odrzucić zmiany",
    cancelButtonText: "Anuluj",
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
  ariaLabels: {
    tableEntry: "Opcja w liście wydarzeń z wydarzeniem o nazwie ",
    addEventButton: "Przycisk do utworzenia nowego wydarzenia",
  },
  noTableEntries: "Brak wydarzeń spełniających kryteria wyszukiwania",
  pageHeader: "Panel podglądu wydarzeń",
  addEventButtonTooltip: "Kliknij, aby utworzyć wydarzenie",
  addEventButtonAriaLabel: "Przycisk do utworzenia wydarzenia",
  tableEntryTooltip: "Kliknij, aby wyświetlić dane o wydarzeniu",
};

const addRoomForm = {
  validation: {
    roomNumberTooShort: "Nazwa pomieszczenia musi być dłuższa niż 2 znaki",
    roomNumberTooLong: "Nazwa pomieszczenia nie może być dłuższa niż 16 znaków",
    capacityTooLow: "Ilość miejsc musi być większa od 0",
  },
  pageHeading: "Utwórz pomieszczenie",
  submitButtonTooltip: "Kliknij, aby utworzyć pomieszczenie",
  submitButtonText: "Zapisz",
  ariaLabels: {
    roomNumber: "Pole tekstowe z nazwą pomieszczenia",
    capacity: "Pole numeryczne z ilością miejs",
  },
  labels: {
    roomNumber: "Nazwa pomieszczenia*",
    capacity: "Ilość miejsc*",
  },
};

const updateLocationForm = {
  updateDataHeading: "Dane lokacji",
  activeHeading: "Aktywność",
  validation: {
    nameTooShort: "Nazwa lokacji musi być dłuższa niż 2 znaki",
    nameTooLong: "Nazwa lokacji nie może być dłuższa niż 64 znaki",
    buildingNumberTooShort: "Numer budynku musi być dłuższy niż 2 znaki",
    buildingNumberTooLong: "Numer budynku nie może być dłuższy niż 16 znaków",
    streetTooShort: "Nazwa ulicy musi być dłuższa niż 2 znaki",
    streetTooLong: "Nazwa ulicy nie może być dłuższa niż 64 znaki",
    cityTooShort: "Nazwa miasta musi być dłuższa niż 2 znaki",
    cityTooLong: "Nazwa miasta nie może być dłuższa niż 64 znaki",
    postalCodeWrongLength:
      "Kod pocztowy musi mieć 6 znaków (w formacie XX-XXX)",
  },
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
  cancelButtonTooltip: "Kliknij, aby zamknąć formularz",
  cancelButtonText: "Zamknij",
};

const updateRoomForm = {
  pageHeading: "Zaktualizuj pomieszczenie",
  updateDataHeading: "Dane pomieszczenia",
  activeHeading: "Aktywność",
  validation: {
    roomNumberTooShort: "Nazwa pomieszczenia musi być dłuższa niż 2 znaki",
    roomNumberTooLong: "Nazwa pomieszczenia nie może być dłuższa niż 16 znaków",
    capacityTooLow: "Ilość miejsc musi być większa od 0",
  },
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
    id: "Identyfikator",
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
    options: "Opcje",
  },
  ariaLabels: {
    editLocationButton: "Przycisk do edycji danych lokacji",
    addRoomButton: "Przycisk do utworzenia pomieszczenia",
    updateRoomButton: "Przycisk do modyfikacji pomieszczenia",
    copyButton:
      "Przycisk do skopiowania identyfikatora pomieszczenia do schowka",
  },
  locationHasNoRooms: "Lokacja nie ma utworzonych żadnych pomieszczeń",
  pageHeading: "Panel zarządzania lokacją",
  locationDataHeading: "Dane o lokacji",
  editLocationButtonTooltip: "Kliknij, aby edytować lokację",
  editLocationButtonText: "Edytuj",
  roomsDataHeading: "Pomieszczenia",
  updateRoomButtonTooltip: "Kliknij, aby edytować pomieszczenie",
  addRoomButtonTooltip: "Kliknij, aby utworzyć pomieszczenie",
  addRoomButtonText: "Utwórz pomieszczenie",
  copyButtonTooltip:
    "Kliknij, aby skopiować identyfikator pomieszczenia do schowka",
  copySuccess: "Identyfikator został skopiowany do schowka",
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
    tableEntry: "Wpis w liście lokacji o wartości ",
  },
  pageHeading: "Panel zarządzania lokacjami",
  addLocationButtonTooltip: "Kliknij, aby utworzyć lokację",
  tableEntryTooltip: "Kliknij, aby wyświetlić dane o lokacji",
};

const addLocationForm = {
  validation: {
    nameTooShort: "Nazwa lokacji musi być dłuższa niż 2 znaki",
    nameTooLong: "Nazwa lokacji nie może być dłuższa niż 64 znaki",
    buildingNumberTooShort: "Numer budynku musi być dłuższy niż 2 znaki",
    buildingNumberTooLong: "Numer budynku nie może być dłuższy niż 16 znaków",
    streetTooShort: "Nazwa ulicy musi być dłuższa niż 2 znaki",
    streetTooLong: "Nazwa ulicy nie może być dłuższa niż 64 znaki",
    cityTooShort: "Nazwa miasta musi być dłuższa niż 2 znaki",
    cityTooLong: "Nazwa miasta nie może być dłuższa niż 64 znaki",
    postalCodeWrongLength:
      "Kod pocztowy musi mieć 6 znaków (w formacie XX-XXX)",
  },
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
    tableEntry: "Wpis w liście typów konferencji o wartości ",
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
    tableEntry: "Wpis w liście organizacji o wartości ",
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
    tableEntry: "Wpis w liście z tytułami prelegentów o wartości ",
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
    tableEntry: "Wpis w liście prelegentów o wartości ",
  },
  pageHeading: "Panel zarządzania prelegentami",
  speakerTableEntryTooltip: "Kliknij, aby wyświetlić dane o prelegencie",
  addSpeakerButtonTooltip: "Kliknij, aby utworzyć prelegenta",
};

const updateOtherParamForm = {
  validation: {
    nameTooShort: "Nazwa musi być dłuższa niż 2 znaki",
    nameTooLong: "Nazwa nie może być dłuższa niż 64 znaki",
  },
  dataHeading: "Dane",
  ariaLabels: {
    name: "Pole tekstowe z nazwą parametru",
    active: "Przełącznik do ustawiania aktywności parametru",
    submitButton: "Przycisk do zapisania zmian",
    copyButton: "Przycisk do skopiowania indentyfikatora parametru do schowka",
  },
  labels: {
    name: "Nazwa*",
  },
  idHeading: "Identyfikator parametru",
  submitButtonTooltip: "Kliknij, aby zapisać zmiany",
  submitButtonText: "Zapisz",
  activeHeading: "Aktywność",
  copyButtonTooltip: "Kliknij, aby skopiować identyfikator do schowka",
  copyButtonText: "Kopiuj",
  copySuccess: "Identyfikator został skopiowany do schowka",
};

const otherPage = {
  pageHeading: "Konfiguracja pozostałych parametrów",
  speakerTitleHeading: "Tytuły prelegentów",
  organizationsHeading: "Organizacje prelegentów",
  speakerTypeHeading: "Typy konferencji",
  validation: {
    speakerTitleTooShort: "Tytuł prelegenta musi być dłuższy niż 2 znaki",
    speakerTitleTooLong: "Tytuł prelegenta nie może być dłuższy niż 64 znaki",
    organizationNameTooShort: "Nazwa organizacji musi być dłuższa niż 2 znaki",
    organizationNameTooLong:
      "Nazwa organizacji nie może być dłuższa niż 64 znaki",
    sessionTypeNameTooShort:
      "Nazwa typu konferencji musi być dłuższa niż 2 znaki",
    sessionTypeNameTooLong:
      "Nazwa typu konferencji nie może być dłuższa niż 64 znaki",
  },
};

const updateSpeakerForm = {
  validation: {
    firstNameTooShort: "Imię prelegenta musi być dłuższe niż 2 znaki",
    firstNameTooLong: "Imię prelegenta nie może być dłuższe niż 64 znaki",
    lastNameTooShort: "Nazwisko prelegenta musi być dłuższe niż 2 znaki",
    lastNameTooLong: "Nazwisko prelegenta musi być dłuższe niż 64 znaki",
    speakerTitleRequired: "Tytuł prelegenta jest wymagany",
    organizaitonRequired: "Organizacja prelegenta jest wymagana",
    emailWrongFormat:
      "Podany adres e-mail prelegenta je jest poprawnym adresem e-mail",
  },
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
    id: "Identyfikator",
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
    copyButton: "Przycisk do skopiowania identyfikatora prelegenta do schowka",
  },
  pageHeading: "Panel zarządzania prelegentem",
  dataHeading: "Dane o prelegencie",
  updateSpeakerButtonTooltip: "Kliknij, aby edytować prelegenta",
  updateSpeakerButtonText: "Edytuj",
  copyButtonTooltip: "Kliknij, aby skopiować indentyfikator do schowka",
  copyButtonText: "Kopiuj",
  copySuccess: "Identyfikator został skopiowany do schowka",
};

const addSessionForm = {
  pageHeading: "Utwórz konferencję",
  validation: {
    nameTooShort: "Nazwa musi być dłuższa niż 2 znaki",
    nameTooLong: "Nazwa nie może być dłuższa niż 64 znaki",
    descriptionPlTooShort:
      "Opis w wersji polskiej musi być dłuższy niż 2 znaki",
    descriptionPlTooLong:
      "Opis w wersji polskiej nie może być dłuższy niż 2000 znaków",
    descriptionEnTooShort:
      "Opis w wersji angielskiej musi być dłuższy niż 2 znaki",
    descriptionEnTooLong:
      "Opis w wersji angielskiej nie może być dłuższy niż 2000 znaków",
    sessionTypeRequired: "Typ konferencji jest wymagany",
    eventBlockRequired: "Blok wydarzenia jest wymagany",
    locationRequired: "Lokacja jest wymagana",
    roomRequired: "Pomieszczenie jest wymagane",
    speakerRequired: "Prelegent jest wymagany",
    maxSeatsTooLow: "Ilość miejsc musi być większa od 0",
    startDateBeforeEndDate: "Data rozpoczęcia musi być przed datą zakończenia",
    endDateAfterStartDate: "Data zakończenia musi być po dacie rozpoczęcia",
    minutesBeforeSignUpClosesTooLow:
      "Czas od zakończenia zapisów do rozpoczęcia konferencji musi być większy od 0",
  },
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
    submitButton: "Przycisk do utworzenia konferencji",
    minutesBeforeSignUpCloses:
      "Pole numeryczne z czasem od zakończenia zapisów do rozpoczęcia konferencji w minutach",
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
    minutesBeforeSignUpCloses:
      "Czas od zakończenia zapisów do rozpoczęcia konferencji (w minutach)",
    endDate: "Data zakończenia",
  },
  sessionTypeCreateLabel: "Taki typ nie istnieje, kliknij aby go stworzyć",
  eventBlockCreateLabel: "Taki blok nie istnieje, kliknij aby go stworzyć",
  locationCreateLabel: "Taka lokacja nie istnieje, kliknij aby ją stworzyć",
  roomCreateLabel: "Takie pomieszczenie nie istnieje, kliknij aby je stworzyć",
  speakerCreateLabel: "Taki prelegent nie istnieje, kliknij aby go stworzyć",
  submitButtonTooltip: "Kliknij, aby utworzyć prelegenta",
  sutmitButtonText: "Utwórz",
};

const addSpeakerForm = {
  validation: {
    firstNameTooShort: "Imię prelegenta musi być dłuższe niż 2 znaki",
    firstNameTooLong: "Imię prelegenta nie może być dłuższe niż 64 znaki",
    lastNameTooShort: "Nazwisko prelegenta musi być dłuższe niż 2 znaki",
    lastNameTooLong: "Nazwisko prelegenta musi być dłuższe niż 64 znaki",
    speakerTitleRequired: "Tytuł prelegenta jest wymagany",
    organizaitonRequired: "Organizacja prelegenta jest wymagana",
    emailWrongFormat:
      "Podany adres e-mail prelegenta je jest poprawnym adresem e-mail",
  },
  pageHeading: "Utwórz prelegenta",
  ariaLabels: {
    firstName: "Pole tekstowe z imieniem prelegenta",
    lastName: "Pole tekstowe z nazwiskiem prelegenta",
    speakerTitle: "Pole wyboru tytułu naukowego prelegenta",
    organization: "Pole wyboru organizacji prelegenta",
    email: "Pole tekstowe z adresem e-mail prelegenta",
    backupEmail:
      "Pole tekstowe z zapasowym adresem e-mail prelegenta. Nie jest wymagany",
    submitButton: "Przycisk do utworzenia nowego prelegenta",
  },
  labels: {
    firstName: "Imię*",
    lastName: "Nazwisko*",
    speakerTitle: "Tytuł naukowy*",
    organization: "Organizacja*",
    email: "Adres e-mail*",
    backupEmail: "Zapasowy adres e-mail",
  },
  createLabels: {
    speakerTitle: "Taki tytuł nie istnieje, kliknij aby go utworzyć",
    organizaiton: "Taka organizacja nie istnieje, kliknij aby ją utworzyć",
  },
  submitButtonTooltip: "Kliknij, aby utworzyć prelegenta",
  submitButtonText: "Utwórz",
};

const otherEmailNotifPage = {
  columnsRow: {
    name: "Nazwa",
    templateType: "Typ szablonu",
    createdAt: "Data utworzenia",
    noCreatedAt: "Brak daty utworzenia",
    updatedAt: "Data aktualizacji",
    noUpdatedAt: "Brak daty aktualizacji",
    active: "Czy aktywny?",
    yes: "Tak",
    no: "Nie",
  },
  ariaLabels: {
    addTemplateButton:
      "Przycisk do utworzenia nowego szablonu powiadomień mailowych",
    tableEntry: "Wpis w liście szablonów powiadomień mailowych o wartości ",
  },
  pageHeading: "Szablony powiadomień mailowych",
  addTemplateHeading: "Utwórz nowy szablon",
  addTemplateButtonText: "Utwórz",
  addTemplateButtonTooltip: "Kliknij, aby utworzyć nowy szablon",
  tableEntryTooltip: "Kliknij, aby edytować szablon",
  tableEntryGlobalTooltip: 'Szablonów typu "GLOBAL" nie można edytować',
  emptyTableMessage: "Brak szablonów",
};

const updateEmailNotifForm = {
  validation: {
    nameTooShort: "Nazwa musi być dłuższa niż 2 znaki",
    nameTooLong: "Nazwa nie może być dłuższa niż 64 znaki",
    subjectTooShort: "Temat maila musi być dłuższy niż 2 znaki",
    subjectTooLong: "Temat maila nie może być dłuższy niż 64 znaki",
    contentPrefixTooShort: "Przedrostek maila musi być dłuższy niż 2 znaki",
    contentPrefiXTooLong:
      "Przedrostek maila nie może być dłuższy niż 255 znaków",
    contentSuffixTooShort: "Przyrostek maila musi być dłuższy niż 2 znaki",
    contentSuffixTooLong:
      "Przyrostek maila nie może być dłuższy niż 255 znaków",
  },
  ariaLabels: {
    name: "Pole tekstowe z nazwą szablonu",
    subject: "Pole tekstowe z tematem maila",
    contentPrefix: "Pole tekstowe z przedrostkiem maila",
    contentSuffix: "Pole tekstowe z przyrostkiem maila",
    submitButton:
      "Przycisk do zapisania zmian w szablonie powiadomień mailowych",
  },
  labels: {
    name: "Nazwa*",
    subject: "Temat maila*",
    contentPrefix: "Przedrostek maila*",
    contentSuffix: "Przyrostek maila*",
  },
  pageHeading: "Zaktualizuj szablon powiadomień mailowych",
  submitButtonTooltip: "Kliknij, aby zapisać zmiany",
  submitButtonText: "Zapisz",
};

const addEmailNotifForm = {
  validation: {
    nameTooShort: "Nazwa musi być dłuższa niż 2 znaki",
    nameTooLong: "Nazwa nie może być dłuższa niż 64 znaki",
    subjectTooShort: "Temat maila musi być dłuższy niż 2 znaki",
    subjectTooLong: "Temat maila nie może być dłuższy niż 64 znaki",
    contentPrefixTooShort: "Przedrostek maila musi być dłuższy niż 2 znaki",
    contentPrefiXTooLong:
      "Przedrostek maila nie może być dłuższy niż 255 znaków",
    contentSuffixTooShort: "Przyrostek maila musi być dłuższy niż 2 znaki",
    contentSuffixTooLong:
      "Przyrostek maila nie może być dłuższy niż 255 znaków",
  },
  ariaLabels: {
    name: "Pole tekstowe z nazwą szablonu",
    subject: "Pole tekstowe z tematem maila",
    contentPrefix: "Pole tekstowe z przedrostkiem maila",
    contentSuffix: "Pole tekstowe z przyrostkiem maila",
    templateType: "Lista wyboru typu szablonu powiadomienia",
    submitButton:
      "Przycisk do utworzenia nowego szablonu powiadomień mailowych",
  },
  labels: {
    name: "Nazwa*",
    subject: "Temat maila*",
    contentPrefix: "Przedrostek maila*",
    contentSuffix: "Przyrostek maila*",
    templateType: "Typ szablonu*",
  },
  pageHeading: "Utwórz szablon powiadomień mailowych",
  submitButtonTooltip: "Kliknij, aby utworzyć szablon powiadomienia",
  submitButtonText: "Utwórz",
};

const sessionViewer = {
  translations: {
    navigation: {
      month: "Miesiąc",
      week: "Tydzień",
      day: "Dzień",
      today: "Dzisiaj",
      agenda: "Podsumowanie",
    },
    form: {
      addTitle: "Add Event",
      editTitle: "Edit Event",
      confirm: "Confirm",
      delete: "Delete",
      cancel: "Cancel",
    },
    event: {
      title: "Tytuł",
      subtitle: "Podtytuł",
      start: "Czas rozpoczęcia",
      end: "Czas zakończenia",
      allDay: "Cały dzień",
    },
    validation: {
      required: "Required",
      invalidEmail: "Invalid Email",
      onlyNumbers: "Only Numbers Allowed",
      min: "Minimum {{min}} letters",
      max: "Maximum {{max}} letters",
    },
    moreEvents: "More...",
    noDataToDisplay: "Tego dnia nie odbywa się żadna konferencja",
    loading: "Loading...",
  },
  accordionTooltip: "Kliknij, aby wyświetlić konferencje",
  accordionText:
    "Kliknij, aby wyświetlić wszystkie konferencje w tym wydarzeniu",
  componentHeading: "Konferencje",
};

const confirmActionModal = {
  pageHeading: "Potwierdź akcję",
  pageBody: "Ta akcja spowoduje zmiany w danych. Czy chcesz kontynuować?",
  confirmButtonTooltip: "Kliknij, aby wykonać akcję",
  confrimButtonText: "Tak",
  denyButtonTooltip: "Kliknij, aby odrzucić zmiany",
  denyButtonText: "Nie",
};

const useSession = {
  createSessionSuccess: "Konferencja została utworzona",
  updateSessionSuccess: "Konferencja została zaktualizowana",
  setSessionActiveSuccess: "Status konferencji został zmieniony",
};

const sidePanel = {
  publicLinks: {
    login: "Zaloguj się",
    register: "Zarejestruj się",
    events: "Wydarzenia",
    forgotPassword: "Przypomnij hasło",
  },
  authenticatedLinks: {
    events: "Wydarzenia",
    myProfile: "Mój profil",
  },
  managerLinks: {
    events: "Zarządzanie wydarzeniami",
    createEvent: "Utwórz wydarzenie",
    speakers: "Zarządzanie prelegentami",
    locations: "Zarządzanie lokacjami",
    other: "Zarządzanie pozostałymi parametrami",
  },
  adminLinks: {
    users: "Zarządzanie użytkownikami",
  },
  publicLinksHeading: "Użytkownik nieuwierzytelniony",
  authenticatedLinksHeading: "Użytkownik uwierzytelniony",
  managerLinksHeading: "Zarządca",
  adminLinksHeading: "Administrator",
  closeSidePanelTooltip: "Kliknij, aby zamknąć panel",
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
  backendErrors,
  otherEmailNotifPage,
  addEmailNotifForm,
  sessionViewer,
  confirmActionModal,
  useSession,
  addSpeakerForm,
  breadcrumbsLabels,
  sidePanel,
  updateEmailNotifForm,
  readFileModal,
  dataHooks,
  eventsPageParticipant,
  eventPageParticipant,
  loginPage,
  accountsPage
} as const;

import { Station } from '@/types/game';

export const stations: Station[] = [
    {
        id: 1,
        name: 'Troposfer',
        subtitle: 'Ay Yolculugunun Baslangici',
        altitude: '0 - 12 km',
        infoText:
            "Geceleri gokyuzunde parlayan Ay, bize cok yakinmis gibi gorunse de aslinda Dunya'dan ortalama 384.400 kilometre uzaklikta devasa bir boslukta suzulur. Bu kadar buyuk bir mesafeyi kat etmek siradan bir ucakla aylar surerdi. Ancak insanoglu, dev roketler insa ederek uzay bosluguna yelken acmayi basardi. Peki, bu cesur kasifler o daracik kapsullerin icinde devasa karanligi asip hedeflerine ne kadar surede ulastilar?",
        funFact:
            "Ay'a yapilan insanli gorevlerde yolculuk suresi ortalama 3 gun civarindaydi.",
        videoUrl: '',
        videoTitle: 'Ay Yolculugu',
        question: {
            id: 'q1',
            type: 'multiple-choice',
            text: "Dunya'dan yola cikan astronotlar yaklasik olarak kac gunde Ay'a varmaktadirlar?",
            options: ['1 gun', '3 gun', '1 hafta', '1 ay'],
            correctAnswer: 1,
            explanation:
                "Maalesef yanlis. Ay'a giden astronotlarin o heyecan verici ve tehlikeli yolculugu yaklasik 3 gun surmektedir.",
            difficulty: 'easy',
        },
        theme: {
            bgGradient: 'from-blue-900 via-blue-800 to-sky-700',
            particleColor: '#60a5fa',
            atmosphereOpacity: 0.8,
            starsVisible: false,
            label: 'Troposfer Katmani',
        },
    },
    {
        id: 2,
        name: 'Stratosfer',
        subtitle: "Ay'in Sert Kosullari",
        altitude: '12 - 50 km',
        infoText:
            "Dunya'da bizi Gunes'in kavurucu sicagindan veya uzayin dondurucu sogugundan koruyan kalin bir battaniyemiz, yani atmosferimiz var. Ancak Ay o kadar sansli degil. Onun yuzeyi, uzayin acimasiz ve sert kosullarina tamamen acik bir coldur. Gunes isiklari dogrudan vurdugunda yuzey adeta bir firina donerken, Gunes battiginda ortam hayal bile edilemeyecek kadar soguk bir buza donusur.",
        funFact:
            "Ay'da atmosfer olmadigi icin sicaklik farklari cok daha sert yasanir.",
        videoUrl: '',
        videoTitle: "Ay'da Sicaklik",
        question: {
            id: 'q2',
            type: 'multiple-choice',
            text: "Ay yuzeyinde gunduz ve gece sicakliklari yaklasik olarak sirasiyla kac derecedir?",
            options: ['50C / -50C', '100C / 0C', '127C / -173C', '200C / -100C'],
            correctAnswer: 2,
            explanation:
                "Yanlis cevap. Ay'da gunduz sicakligi yaklasik 127C'ye cikarken, gece yaklasik -173C'ye kadar duser.",
            difficulty: 'easy',
        },
        theme: {
            bgGradient: 'from-sky-700 via-indigo-800 to-blue-900',
            particleColor: '#818cf8',
            atmosphereOpacity: 0.6,
            starsVisible: false,
            label: 'Stratosfer Katmani',
        },
    },
    {
        id: 3,
        name: 'Mezosfer',
        subtitle: 'Ay Denizleri',
        altitude: '50 - 85 km',
        infoText:
            "Eski caglarda insanlar Ay'a baktiklarinda, gordukleri o devasa koyu lekelerin tipki Dunya'daki gibi engin okyanuslar oldugunu hayal ettiler. Bugun teleskoplarimiz sayesinde o bolgelerin aslinda suyla degil, milyarlarca yil once yuzeye cikip sogumus devasa karanlik lav ovalariyla kapli oldugunu biliyoruz.",
        funFact:
            "Ay yuzeyindeki karanlik duzlukler, eski inanislardan kalma isimlerle anilmaya devam eder.",
        videoUrl: '',
        videoTitle: 'Ay Denizleri',
        question: {
            id: 'q3',
            type: 'multiple-choice',
            text: 'Ciplak gozle rahatlikla gorulebilen, Ay yuzeyinde bulunan karanlik Ay duzluklerine hangi isim verilir?',
            options: ['Ay Dagi', 'Ay Okyanusu', 'Ay Cukuru', 'Ay Denizi'],
            correctAnswer: 3,
            explanation:
                "Dogru cevap 'Ay Denizi' olmaliydi. Gecmiste insanlar bu karanlik duzlukleri gercekten su kutlesi sanip bu romantik ismi vermislerdir.",
            difficulty: 'easy',
        },
        theme: {
            bgGradient: 'from-indigo-900 via-purple-900 to-violet-950',
            particleColor: '#a78bfa',
            atmosphereOpacity: 0.4,
            starsVisible: true,
            label: 'Mezosfer Katmani',
        },
    },
    {
        id: 4,
        name: 'Termosfer',
        subtitle: "Ay'in Uzaklasan Yolculugu",
        altitude: '85 - 600 km',
        infoText:
            "Ay, yaklasik 4.5 milyar yildir Dunya'nin en sadik yol arkadasidir. Okyanuslardaki gelgitleri etkiler ve gezegenimizin dengesine katkida bulunur. Ancak uzaydaki bu muhtesem kozmik dans her zaman ayni kalmiyor. Ay, gorunmez kutlecekim etkileri nedeniyle zaman gectikce Dunya'dan cok yavas ama surekli bir sekilde uzaklasiyor.",
        funFact:
            "Ay, her yil tirnak uzama hizina benzer olcude Dunya'dan uzaklasir.",
        videoUrl: '',
        videoTitle: "Ay'in Uzaklasmasi",
        question: {
            id: 'q4',
            type: 'multiple-choice',
            text: "Ay, her yil Dunya'dan yaklasik olarak ne kadar uzaklasmaktadir?",
            options: ['1.5 cm', '3.8 cm', '10 cm', '25 cm'],
            correctAnswer: 1,
            explanation:
                "Hatali secim. Karsilikli kutlecekimsel etkilesimler nedeniyle Ay, her yil Dunya'dan yaklasik 3.8 cm uzaklasmaktadir.",
            difficulty: 'medium',
        },
        theme: {
            bgGradient: 'from-violet-950 via-purple-950 to-indigo-950',
            particleColor: '#c084fc',
            atmosphereOpacity: 0.2,
            starsVisible: true,
            label: 'Termosfer Katmani',
        },
    },
    {
        id: 5,
        name: 'Ekzosfer',
        subtitle: 'Tarihi Inis Gorevi',
        altitude: '600 - 10.000 km',
        infoText:
            "\"Benim icin kucuk, insanlik icin dev bir adim...\" 1969 yilinin o unutulmaz gununde milyonlarca insan televizyonlarin basinda nefesini tutmustu. Insanoglu, kendi evi olan Dunya'yi ilk kez terk edip baska bir gok cisminin tozlu yuzeyine ayak basmak uzereydi. Bu destansi yolculuk, tum dunyanin kaderini degistiren cesur bir ekibin goreviyle gercek oldu.",
        funFact:
            "Apollo programi, insanlik tarihinin en ikonik uzay basarilarindan biridir.",
        videoUrl: '',
        videoTitle: 'Apollo Gorevleri',
        question: {
            id: 'q5',
            type: 'multiple-choice',
            text: "Ay'a ilk insanli inisi gerceklestiren gorev asagidakilerden hangisidir?",
            options: ['Apollo 8', 'Apollo 10', 'Apollo 11', 'Apollo 13'],
            correctAnswer: 2,
            explanation:
                "Yanlis cevap. Neil Armstrong ve Buzz Aldrin'i Ay yuzeyine ulastiran o tarihi gorev Apollo 11'dir.",
            difficulty: 'medium',
        },
        theme: {
            bgGradient: 'from-indigo-950 via-slate-950 to-gray-950',
            particleColor: '#e0e7ff',
            atmosphereOpacity: 0.05,
            starsVisible: true,
            label: 'Ekzosfer Katmani',
        },
    },
    {
        id: 6,
        name: 'Dunya Yorungesi',
        subtitle: "Ay'da Yuruyenler",
        altitude: '~400 km (LEO)',
        infoText:
            "Ay'a gitmek sadece bayrak dikmekten ibaret degildi. Bilim insanlari, Ay'in kokenini anlamak icin Dunya'ya bolca tas ve toprak ornegi getirilmesini istiyordu. 1969'dan 1972'ye kadar suren o altin cagda, cesur kasifler Ay yuzeyinde gezdiler, deneyler yaptilar ve unutulmaz ayak izleri biraktilar. Ancak bu essiz deneyimi yasayanlarin sayisi tahmin edilenden daha azdi.",
        funFact:
            "Bugune kadar Ay yuzeyine yalnizca 12 insan ayak basti.",
        videoUrl: '',
        videoTitle: 'Ayda Yuruyen Astronotlar',
        question: {
            id: 'q6',
            type: 'multiple-choice',
            text: "Apollo gorevleri ile toplam kac astronot Ay'da yurumustur?",
            options: ['2', '6', '12', '24'],
            correctAnswer: 2,
            explanation:
                "Yanlis sayi. Dunya tarihinde bugune kadar Ay yuzeyine ayak basma serefine erisen yalnizca 12 astronot vardir.",
            difficulty: 'medium',
        },
        theme: {
            bgGradient: 'from-gray-950 via-slate-950 to-black',
            particleColor: '#94a3b8',
            atmosphereOpacity: 0,
            starsVisible: true,
            label: 'Dunya Yorungesi',
        },
    },
    {
        id: 7,
        name: 'Derin Uzay',
        subtitle: 'Regolit Katmani',
        altitude: '~100.000 km',
        infoText:
            "Ay'in yuzeyinde yurmek, pudra sekeri gibi incecik gri bir tozun icinde yurumege benzer. Milyarlarca yil boyunca Ay'a carpip duran meteorlar, yuzeydeki kayalari adeta devasa bir degirmende oguterek bu pudramsi katmani olusturmustur. Astronotlarin uzay kiyafetlerine yapisan bu toz tabakasi, Ay'in siddetli tarihinin sessiz bir tanigidir.",
        funFact:
            "Ay tozu cok ince olmasina ragmen keskin yapili oldugu icin kolay temizlenmez.",
        videoUrl: '',
        videoTitle: 'Ay Tozu',
        question: {
            id: 'q7',
            type: 'multiple-choice',
            text: 'Ay yuzeyinde bulunan cok ince toz tabakasina bilimsel olarak ne ad verilir?',
            options: ['Regolit', 'Magma', 'Bazalt', 'Silikat'],
            correctAnswer: 0,
            explanation:
                "Bilemedin. Ay yuzeyini kaplayan ve goktaslarinin milyarlarca yildir kayalari ufalamasi ile olusan bu ince toz tabakasina 'regolit' denir.",
            difficulty: 'medium',
        },
        theme: {
            bgGradient: 'from-black via-gray-950 to-black',
            particleColor: '#f8fafc',
            atmosphereOpacity: 0,
            starsVisible: true,
            label: 'Derin Uzay',
        },
    },
    {
        id: 8,
        name: 'Ay Yorungesi',
        subtitle: 'Ilk Robotik Oncu',
        altitude: '~384.000 km',
        infoText:
            "Soguk Savas yillarinda Amerika ve Sovyetler Birligi, Ay'a ilk ulasan taraf olmak icin teknolojinin sinirlarini zorluyordu. Henuz insanlari bu tehlikeli yolculuga cikarmaya cesaret edemedikleri ilk gunlerde, gokyuzune donemin en ileri teknolojisiyle donatilmis robotik onculler firlatildi. Insan yapimi bir nesnenin ilk kez Ay'in o gizemli siluetine bu kadar yaklasmasi yepyeni bir cagin ayak sesleriydi.",
        funFact:
            "Ay'in yakinindan gecen ilk insan yapimi nesne Sovyetler Birligi tarafindan gonderildi.",
        videoUrl: '',
        videoTitle: 'Luna Gorevleri',
        question: {
            id: 'q8',
            type: 'multiple-choice',
            text: "Ay'in yakinindan gecen ilk yapay nesne asagidakilerden hangisidir?",
            options: ['Sputnik 1', 'Luna 1', 'Luna 2', 'Explorer 1'],
            correctAnswer: 1,
            explanation:
                "Yanlis cevap. Ay'in yakinindan gecen ilk insan yapimi nesne Sovyetler Birligi'nin 'Luna 1' uydusudur. Luna 2 ise daha sonra yuzeye carpan ilk nesne olmustur.",
            difficulty: 'hard',
        },
        theme: {
            bgGradient: 'from-black via-gray-900 to-slate-800',
            particleColor: '#d1d5db',
            atmosphereOpacity: 0,
            starsVisible: true,
            label: 'Ay Yorungesi',
        },
    },
    {
        id: 9,
        name: "Ay'a Yaklasma",
        subtitle: 'Yumusak Inis Basarisi',
        altitude: '~100 km (Ay Yuzeyine)',
        infoText:
            "Uzay yarisinin en hareketli yillarinda roketleri Ay'a dogru firlatip yuzeye carptirmak bile buyuk bir basari sayiliyordu. Ancak asil buyuk sinav, tonlarca agirliktaki bir metal yigini parcalamadan Ay yuzeyine indirebilmekti. Hizini tam gerektigi kadar azaltip hasar almadan yuzeye inen o ilk arac, uzay muhendisliginin en buyuk zaferlerinden biri oldu.",
        funFact:
            "Luna 9, Ay yuzeyine parcalanmadan ilk yumusak inisi yapan arac olarak tarihe gecti.",
        videoUrl: '',
        videoTitle: 'Yumusak Inis',
        question: {
            id: 'q9',
            type: 'multiple-choice',
            text: 'Ay yuzeyine parcalanmadan ilk yumusak inis yapabilen uzay araci hangisidir?',
            options: ['Luna 2', 'Luna 9', 'Luna 10', 'Apollo 11'],
            correctAnswer: 1,
            explanation:
                "Yanlis. Ay yuzeyine parcalanmadan ilk yumusak inisi yapmayi basaran arac bir Sovyet efsanesi olan 'Luna 9' olmustur.",
            difficulty: 'hard',
        },
        theme: {
            bgGradient: 'from-slate-800 via-gray-700 to-stone-600',
            particleColor: '#e5e7eb',
            atmosphereOpacity: 0,
            starsVisible: true,
            label: "Ay'a Yaklasma",
        },
    },
    {
        id: 10,
        name: 'Ay Yuzeyi',
        subtitle: 'Ilk Yorunge Araci',
        altitude: '0 km (Ay Yuzeyi)',
        infoText:
            "Bir uzay aracinin Ay'in yanindan hizla gecip gitmesi veya dogrudan uzerine cakilmasi buyuk bir isti; ancak asil detayli kesif onun etrafinda kalici bir tur atmakla baslayacakti. Uzay aracinin hizini tam gerektigi anda yavaslatip kendini Ay'in gorunmez kutlecekimine biraktigi bu manevra, uzay tarihinin en hassas robotik basarilarindan biri oldu.",
        funFact:
            "Luna 10, Ay yorungesine girip etrafinda dolasan ilk insansiz uzay araci oldu.",
        videoUrl: '',
        videoTitle: 'Ay Yorungesi',
        question: {
            id: 'q10',
            type: 'multiple-choice',
            text: "Ay yorungesine girip etrafinda tur atan ilk insansiz uzay araci asagidakilerden hangisidir?",
            options: ['Luna 1', 'Luna 2', 'Luna 9', 'Luna 10'],
            correctAnswer: 3,
            explanation:
                "Maalesef yanlis. Ay'in yorungesine yakalanip onun etrafinda ilk kez donmeye baslayan insansiz uzay araci 'Luna 10' dur.",
            difficulty: 'hard',
        },
        theme: {
            bgGradient: 'from-stone-600 via-stone-500 to-stone-400',
            particleColor: '#f5f5f4',
            atmosphereOpacity: 0,
            starsVisible: true,
            label: 'Ay Yuzeyi',
        },
    },
];

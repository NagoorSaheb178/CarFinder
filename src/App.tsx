import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Heart, Search, Filter, ChevronLeft, ChevronRight, X, Calendar, Clock, Loader2 } from 'lucide-react';
import { Transition } from '@headlessui/react';
import toast, { Toaster } from 'react-hot-toast';

// Types
interface Car {
  id: number;
  brand: string;
  model: string;
  price: number;
  fuelType: string;
  seatingCapacity: number;
  image: string;
  description: string;
  year: number;
  mileage: number;
  transmission: string;
}

interface Filters {
  brand: string;
  minPrice: string;
  maxPrice: string;
  fuelType: string;
  seatingCapacity: string;
  year: string;
  transmission: string;
}

interface TestDrive {
  id: string;
  carId: number;
  carBrand: string;
  carModel: string;
  date: string;
  time: string;
  confirmed: boolean;
}

// Mock API function with loading simulation
const fetchCars = async (): Promise<Car[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        // Page 1 Cars (1-10)
        {
          id: 1,
          brand: 'Toyota',
          model: 'Camry',
          price: 25000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          year: 2022,
          mileage: 15000,
          transmission: 'Automatic',
          image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
          description: 'The reliable Toyota Camry offers a comfortable ride with excellent fuel efficiency and advanced safety features.'
        },
        {
          id: 2,
          brand: 'Honda',
          model: 'Civic',
          price: 22000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          year: 2021,
          mileage: 20000,
          transmission: 'Automatic',
          image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=500',
          description: 'Sporty yet practical, the Honda Civic delivers impressive performance with its efficient engine and sleek design.'
        },
        {
          id: 3,
          brand: 'Ford',
          model: 'Mustang',
          price: 45000,
          fuelType: 'Petrol',
          seatingCapacity: 4,
          image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500',
          description: 'Iconic American muscle car with powerful performance, aggressive styling, and thrilling driving dynamics.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 4,
          brand: 'Tesla',
          model: 'Model 3',
          price: 50000,
          fuelType: 'Electric',
          seatingCapacity: 5,
          image: 'https://www.shop4tesla.com/cdn/shop/articles/lohnt-sich-ein-gebrauchtes-tesla-model-3-vor-und-nachteile-833053.jpg?v=1733570691',
          description: 'Premium electric sedan offering instant acceleration, cutting-edge technology, and zero emissions.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 5,
          brand: 'BMW',
          model: 'X5',
          price: 65000,
          fuelType: 'Diesel',
          seatingCapacity: 5,
          image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500',
          description: 'Luxury SUV combining sporty performance with premium comfort and advanced technology features.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 6,
          brand: 'Mercedes',
          model: 'C-Class',
          price: 48000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500',
          description: 'Elegant executive sedan with a refined interior, smooth ride, and powerful engine options.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 7,
          brand: 'Audi',
          model: 'A4',
          price: 42000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
          description: 'Premium compact sedan featuring Quattro all-wheel drive, virtual cockpit, and luxurious interior.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 8,
          brand: 'Hyundai',
          model: 'Tucson',
          price: 32000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500',
          description: 'Stylish and practical SUV with generous standard features and excellent warranty coverage.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 9,
          brand: 'Kia',
          model: 'Sorento',
          price: 38000,
          fuelType: 'Diesel',
          seatingCapacity: 7,
          image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=500',
          description: 'Three-row family SUV offering spacious seating, modern tech, and confident driving dynamics.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 10,
          brand: 'Subaru',
          model: 'Outback',
          price: 36000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          image: 'https://www.gpsubaru.com/wp-content/uploads/2024/10/2025-outback-exterior.jpg',
          description: 'Rugged yet refined wagon with standard all-wheel drive, perfect for adventure seekers.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        // Page 2 Cars (11-20)
        {
          id: 11,
          brand: 'Volkswagen',
          model: 'Golf',
          price: 28000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500',
          description: 'Iconic hatchback offering German engineering, fun driving dynamics, and practical versatility.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 12,
          brand: 'Mazda',
          model: 'CX-5',
          price: 34000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=500',
          description: 'Premium-feeling compact SUV with engaging driving dynamics and upscale interior materials.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 13,
          brand: 'Lexus',
          model: 'RX',
          price: 52000,
          fuelType: 'Hybrid',
          seatingCapacity: 5,
          image: 'https://hips.hearstapps.com/hmg-prod/images/2025-lexus-rx350-premium-101-66f2dbe526c80.jpg?crop=0.730xw:0.547xh;0.0645xw,0.389xh&resize=1200:*',
          description: 'Luxury hybrid SUV offering whisper-quiet operation, plush ride, and impeccable build quality.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 14,
          brand: 'Jeep',
          model: 'Wrangler',
          price: 42000,
          fuelType: 'Petrol',
          seatingCapacity: 4,
          image: 'https://assets.gqindia.com/photos/5d4bd0db0ea478000820f097/16:9/w_1920,h_1080,c_limit/Jeep-Wrangler.jpg',
          description: 'Legendary off-road capability with removable doors and roof for open-air adventure experiences.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 15,
          brand: 'Porsche',
          model: '911',
          price: 120000,
          fuelType: 'Petrol',
          seatingCapacity: 2,
          image: 'https://images.unsplash.com/photo-1588258219511-64eb629cb833?w=500',
          description: 'Iconic sports car with perfect balance, exhilarating performance, and timeless design.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 16,
          brand: 'Chevrolet',
          model: 'Corvette',
          price: 75000,
          fuelType: 'Petrol',
          seatingCapacity: 2,
          image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=500',
          description: 'American supercar with mid-engine layout, delivering exotic performance at an attainable price.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 17,
          brand: 'Nissan',
          model: 'Rogue',
          price: 32000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          image: 'https://di-uploads-pod29.dealerinspire.com/rosennissanmadison/uploads/2024/01/2024-nissan-rogue-for-sale.png',
          description: 'Comfortable and efficient family SUV with available ProPILOT Assist semi-autonomous driving.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 18,
          brand: 'Volvo',
          model: 'XC60',
          price: 48000,
          fuelType: 'Hybrid',
          seatingCapacity: 5,
          image: 'https://pictures.dealer.com/b/bridgewatervolvovcna/0781/d759a45b262389559f8f3a20075408a1x.jpg?impolicy=downsize_bkpt&w=410',
          description: 'Scandinavian luxury SUV with industry-leading safety features and elegant minimalist design.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 19,
          brand: 'Land Rover',
          model: 'Range Rover',
          price: 95000,
          fuelType: 'Diesel',
          seatingCapacity: 5,
          image: 'https://images.unsplash.com/photo-1588258219511-64eb629cb833?w=500',
          description: 'The ultimate luxury SUV combining peerless off-road capability with limousine-like refinement.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 20,
          brand: 'Jaguar',
          model: 'F-Type',
          price: 85000,
          fuelType: 'Petrol',
          seatingCapacity: 2,
          image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=500',
          description: 'British sports car with stunning design, exhilarating performance, and a glorious exhaust note.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        // Page 3 Cars (21-30)
        {
          id: 21,
          brand: 'Mini',
          model: 'Cooper',
          price: 32000,
          fuelType: 'Petrol',
          seatingCapacity: 4,
          image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mini/Cooper-S/11777/1721809942570/front-left-side-47.jpg',
          description: 'Playful British hatchback with go-kart handling, customizable style, and premium features.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 22,
          brand: 'Fiat',
          model: '500',
          price: 22000,
          fuelType: 'Petrol',
          seatingCapacity: 4,
          image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500',
          description: 'Charming Italian city car with retro styling, efficient engines, and surprisingly fun driving dynamics.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 23,
          brand: 'Alfa Romeo',
          model: 'Giulia',
          price: 52000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=500',
          description: 'Passionate Italian sports sedan with razor-sharp handling and head-turning styling.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 24,
          brand: 'Mitsubishi',
          model: 'Outlander',
          price: 32000,
          fuelType: 'Hybrid',
          seatingCapacity: 7,
          image: 'https://motoroctane.com/wp-content/uploads/2020/06/mitsubishi-india-1.jpg',
          description: 'Affordable three-row hybrid SUV with available Super All-Wheel Control system for all-weather confidence.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 25,
          brand: 'Buick',
          model: 'Enclave',
          price: 42000,
          fuelType: 'Petrol',
          seatingCapacity: 7,
          image: 'https://di-uploads-pod17.dealerinspire.com/greggyoungbuickgmc/uploads/2022/07/22Buick-Enclave-ExteriorOutsideCafe-5x3.jpg',
          description: 'Comfort-focused three-row SUV with quiet cabin, smooth ride, and upscale interior appointments.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 26,
          brand: 'Cadillac',
          model: 'Escalade',
          price: 85000,
          fuelType: 'Diesel',
          seatingCapacity: 7,
          image: 'https://images.unsplash.com/photo-1588258219511-64eb629cb833?w=500',
          description: 'Full-size luxury SUV with massive presence, cutting-edge technology, and limousine-like rear seating.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 27,
          brand: 'Chrysler',
          model: '300',
          price: 38000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=500',
          description: 'American luxury sedan with bold styling, powerful engine options, and spacious interior.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 28,
          brand: 'Dodge',
          model: 'Charger',
          price: 42000,
          fuelType: 'Petrol',
          seatingCapacity: 5,
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/1969_Dodge_Charger_R-T%2C_front_right_%282022_Ellwood_City_Fall_Fest_%26_Car_Cruise%29.jpg',
          description: 'Muscle sedan with aggressive styling, thunderous V8 options, and practical four-door configuration.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 29,
          brand: 'GMC',
          model: 'Sierra',
          price: 48000,
          fuelType: 'Diesel',
          seatingCapacity: 5,
          image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500',
          description: 'Premium full-size pickup truck with professional-grade capability and upscale interior options.',
          year: 0,
          mileage: 0,
          transmission: ''
        },
        {
          id: 30,
          brand: 'Infiniti',
          model: 'QX60',
          price: 52000,
          fuelType: 'Petrol',
          seatingCapacity: 7,
          image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=500',
          description: 'Luxury three-row SUV featuring serene ride quality, premium materials, and advanced safety tech.',
          year: 0,
          mileage: 0,
          transmission: ''
        }
      
        // ... (rest of the car data with added year, mileage, and transmission fields)
        // Continue with all 30 cars from original data
      ]);
    }, 800); // Simulate API delay
  });
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [testDrives, setTestDrives] = useState<TestDrive[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    seatingCapacity: '',
    year: '',
    transmission: ''
  });
  const [showWishlist, setShowWishlist] = useState(false);
  const [showTestDrives, setShowTestDrives] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showTestDriveForm, setShowTestDriveForm] = useState(false);
  const [testDriveDate, setTestDriveDate] = useState('');
  const [testDriveTime, setTestDriveTime] = useState('');

  // Constants
  const carsPerPage = 10;
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const currentCars = filteredCars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );
  const wishlistCars = cars.filter(car => wishlist.includes(car.id));

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, scale: 0.9 },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: darkMode 
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
        : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  // Load data from localStorage and fetch cars
  useEffect(() => {
    const savedWishlist = localStorage.getItem('carWishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    
    const savedTestDrives = localStorage.getItem('testDrives');
    if (savedTestDrives) setTestDrives(JSON.parse(savedTestDrives));
    
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

    // Fetch cars from API
    const loadCars = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCars();
        setCars(data);
        setFilteredCars(data);
      } catch (err) {
        setError('Failed to load cars. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('carWishlist', JSON.stringify(wishlist));
    localStorage.setItem('testDrives', JSON.stringify(testDrives));
    localStorage.setItem('darkMode', darkMode.toString());
  }, [wishlist, testDrives, darkMode]);

  // Apply dark mode class to HTML element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Filter cars based on search and filters
  useEffect(() => {
    const filtered = cars.filter(car => {
      const searchMatch = `${car.brand} ${car.model}`.toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const filterMatch = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        switch(key) {
          case 'minPrice': return car.price >= Number(value);
          case 'maxPrice': return car.price <= Number(value);
          case 'seatingCapacity': return car.seatingCapacity === Number(value);
          case 'year': return car.year === Number(value);
          case 'transmission': return car.transmission.toLowerCase() === value.toLowerCase();
          default: return car[key as keyof Car].toString().toLowerCase() === value.toLowerCase();
        }
      });

      return searchMatch && filterMatch;
    });

    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [searchTerm, filters, cars]);

  const toggleWishlist = (carId: number) => {
    setWishlist(prev => {
      const newWishlist = prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId];
      
      toast.success(prev.includes(carId) 
        ? 'Removed from wishlist' 
        : 'Added to wishlist');
      
      return newWishlist;
    });
  };

  const scheduleTestDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar || !testDriveDate || !testDriveTime) return;
    
    const newTestDrive: TestDrive = {
      id: Date.now().toString(),
      carId: selectedCar.id,
      carBrand: selectedCar.brand,
      carModel: selectedCar.model,
      date: testDriveDate,
      time: testDriveTime,
      confirmed: true
    };
    
    setTestDrives(prev => [...prev, newTestDrive]);
    toast.success(`Test drive scheduled for ${selectedCar.brand} ${selectedCar.model} on ${testDriveDate} at ${testDriveTime}`);
    
    setShowTestDriveForm(false);
    setTestDriveDate('');
    setTestDriveTime('');
    setSelectedCar(null);
  };

  const cancelTestDrive = (id: string) => {
    setTestDrives(prev => prev.filter(drive => drive.id !== id));
    toast.success('Test drive cancelled');
  };

  const sortCars = (order: 'asc' | 'desc') => {
    setFilteredCars(prev => [...prev].sort((a, b) => 
      order === 'asc' ? a.price - b.price : b.price - a.price
    ));
  };

  const handlePriceFilterChange = (type: 'minPrice' | 'maxPrice', value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFilters(prev => ({
      ...prev,
      [type]: numericValue
    }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      fuelType: '',
      seatingCapacity: '',
      year: '',
      transmission: ''
    });
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4 space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-right" />
      
      {/* Wishlist Sidebar */}
      <AnimatePresence>
        {showWishlist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={() => setShowWishlist(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold dark:text-white">
                    My Wishlist ({wishlist.length})
                  </h2>
                  <button
                    onClick={() => setShowWishlist(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <X className="w-6 h-6 text-gray-700 dark:text-white" />
                  </button>
                </div>

                {wishlistCars.length > 0 ? (
                  <motion.div 
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {wishlistCars.map(car => (
                      <motion.div
                        key={car.id}
                        variants={itemVariants}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <motion.img
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                          className="w-20 h-20 object-cover rounded-md"
                          whileHover={imageHover}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold dark:text-white">
                            {car.brand} {car.model}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            ${car.price.toLocaleString()}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={buttonTap}
                          onClick={() => toggleWishlist(car.id)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                        >
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-gray-500 dark:text-gray-400"
                  >
                    Your wishlist is empty
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test Drives Sidebar */}
      <AnimatePresence>
        {showTestDrives && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={() => setShowTestDrives(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold dark:text-white">
                    My Test Drives ({testDrives.length})
                  </h2>
                  <button
                    onClick={() => setShowTestDrives(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <X className="w-6 h-6 text-gray-700 dark:text-white" />
                  </button>
                </div>

                {testDrives.length > 0 ? (
                  <motion.div 
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {testDrives.map(drive => (
                      <motion.div
                        key={drive.id}
                        variants={itemVariants}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold dark:text-white">
                              {drive.carBrand} {drive.carModel}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-1">
                              <Calendar className="w-4 h-4" />
                              <span>{drive.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{drive.time}</span>
                            </div>
                          </div>
                          <motion.button
                            whileHover={buttonHover}
                            whileTap={buttonTap}
                            onClick={() => cancelTestDrive(drive.id)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-gray-500 dark:text-gray-400"
                  >
                    No test drives scheduled
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Car Details Modal */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm overflow-y-auto p-4"
            onClick={() => setSelectedCar(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 bg-gray-100 dark:bg-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {selectedCar.brand} {selectedCar.model}
                </h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCar(null)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                >
                  <X className="w-6 h-6 text-gray-700 dark:text-white" />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Car Image */}
                <motion.div 
                  className="relative overflow-hidden rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.img
                    src={selectedCar.image}
                    alt={`${selectedCar.brand} ${selectedCar.model}`}
                    className="w-full h-64 object-cover"
                    whileHover={imageHover}
                  />
                  <motion.div 
                    className="absolute bottom-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    ${selectedCar.price.toLocaleString()}
                  </motion.div>
                </motion.div>

                {/* Car Details */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Description</h3>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {selectedCar.description}
                  </motion.p>

                  <motion.div 
                    className="grid grid-cols-2 gap-4 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <span className="block text-sm text-gray-500 dark:text-gray-400">Fuel Type</span>
                      <span className="font-medium dark:text-white">{selectedCar.fuelType}</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <span className="block text-sm text-gray-500 dark:text-gray-400">Seating</span>
                      <span className="font-medium dark:text-white">{selectedCar.seatingCapacity} Seats</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <span className="block text-sm text-gray-500 dark:text-gray-400">Year</span>
                      <span className="font-medium dark:text-white">{selectedCar.year}</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <span className="block text-sm text-gray-500 dark:text-gray-400">Transmission</span>
                      <span className="font-medium dark:text-white">{selectedCar.transmission}</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <span className="block text-sm text-gray-500 dark:text-gray-400">Mileage</span>
                      <span className="font-medium dark:text-white">{selectedCar.mileage.toLocaleString()} miles</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.button 
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                      onClick={() => setShowTestDriveForm(true)}
                      className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Schedule Test Drive
                    </motion.button>
                    <motion.button 
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                      className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Contact Dealer
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Test Drive Form */}
              {showTestDriveForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                    <h3 className="text-xl font-bold mb-4 dark:text-white">Schedule Test Drive</h3>
                    <form onSubmit={scheduleTestDrive}>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="testDriveDate">
                            Date
                          </label>
                          <input
                            type="date"
                            id="testDriveDate"
                            value={testDriveDate}
                            onChange={(e) => setTestDriveDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                            required
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="testDriveTime">
                            Time
                          </label>
                          <input
                            type="time"
                            id="testDriveTime"
                            value={testDriveTime}
                            onChange={(e) => setTestDriveTime(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                            required
                          />
                        </motion.div>
                      </div>
                      <motion.div
                        className="flex gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.button
                          type="submit"
                          whileHover={buttonHover}
                          whileTap={buttonTap}
                          className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                        >
                          Confirm
                        </motion.button>
                        <motion.button
                          type="button"
                          whileHover={buttonHover}
                          whileTap={buttonTap}
                          onClick={() => setShowTestDriveForm(false)}
                          className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg"
                        >
                          Cancel
                        </motion.button>
                      </motion.div>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Additional Features Section */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-gray-50 dark:bg-gray-700">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Key Features</h3>
                  <motion.ul 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {[
                      'Advanced Safety Features',
                      'Premium Sound System',
                      'Navigation System',
                      'Leather Seats',
                      'Panoramic Sunroof',
                      'Heated Seats',
                      'Blind Spot Monitoring',
                      'Adaptive Cruise Control'
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-green-500">✓</span> {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Car Finder
            </motion.h1>
            <div className="flex items-center gap-4">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => setShowTestDrives(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 dark:text-white">
                  Test Drives ({testDrives.length})
                </span>
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => setShowWishlist(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-gray-700 dark:text-white">
                  Wishlist ({wishlist.length})
                </span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {darkMode ? 
                  <Sun className="w-5 h-5 text-yellow-500" /> : 
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                }
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-red-500 mb-4">{error}</h3>
            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </motion.button>
          </div>
        ) : isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <motion.div 
              className="mb-8 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <motion.div 
                  className="flex-1 relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </motion.div>
                <motion.div 
                  className="flex gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    onClick={() => sortCars('asc')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Price ↑
                  </motion.button>
                  <motion.button
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    onClick={() => sortCars('desc')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Price ↓
                  </motion.button>
                </motion.div>
              </div>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2"
                >
                  <option value="">All Brands</option>
                  {[...new Set(cars.map(car => car.brand))].map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => handlePriceFilterChange('minPrice', e.target.value)}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2"
                />

                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => handlePriceFilterChange('maxPrice', e.target.value)}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2"
                />

                <select
                  value={filters.fuelType}
                  onChange={(e) => setFilters(prev => ({ ...prev, fuelType: e.target.value }))}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2"
                >
                  <option value="">All Fuel Types</option>
                  {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select
                  value={filters.seatingCapacity}
                  onChange={(e) => setFilters(prev => ({ ...prev, seatingCapacity: e.target.value }))}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2"
                >
                  <option value="">All Seats</option>
                  {[2, 4, 5, 7, 8].map(seats => (
                    <option key={seats} value={seats}>{seats} Seats</option>
                  ))}
                </select>

                {/* Year Filter */}
                <select
                  value={filters.year}
                  onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2"
                >
                  <option value="">All Years</option>
                  {[...new Set(cars.map(car => car.year))].sort((a, b) => b - a).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                {/* Transmission Filter */}
                <select
                  value={filters.transmission}
                  onChange={(e) => setFilters(prev => ({ ...prev, transmission: e.target.value }))}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2"
                >
                  <option value="">All Transmissions</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-2"
              >
                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg transition-colors"
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Car Grid */}
            {currentCars.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <AnimatePresence>
                  {currentCars.map(car => (
                    <motion.div
                      key={car.id}
                      variants={cardVariants}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                      whileHover="hover"
                      exit="exit"
                    >
                      <div className="relative">
                        <motion.img
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-48 object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          whileHover={imageHover}
                        />
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={buttonTap}
                          onClick={() => toggleWishlist(car.id)}
                          className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full shadow-sm"
                        >
                          <Heart
                            className={`w-6 h-6 ${wishlist.includes(car.id) ? 'text-red-500 fill-current' : 'text-gray-700 dark:text-white'}`}
                          />
                        </motion.button>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                              {car.brand} {car.model}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              {car.year} • {car.mileage.toLocaleString()} mi
                            </p>
                          </div>
                          <span className="text-xl font-bold text-blue-500">
                            ${car.price.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                            {car.fuelType}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                            {car.seatingCapacity} Seats
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                            {car.transmission}
                          </span>
                        </div>

                        <motion.button
                          whileHover={buttonHover}
                          whileTap={buttonTap}
                          onClick={() => setSelectedCar(car)}
                          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500 dark:text-gray-400"
              >
                No cars found matching your criteria
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                
                <span className="text-gray-700 dark:text-white">
                  Page {currentPage} of {totalPages}
                </span>

                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const imageHover = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};

const buttonHover = {
  scale: 1.05,
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
};

const buttonTap = {
  scale: 0.95
};

export default App;
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ShoppingCart, User, Home, Search, ChevronLeft, ChevronRight, Star, Clock, DollarSign,  Heart, Plus, Minus,  } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Mock data
const foodItems = [
  { id: 1, name: 'Margherita Pizza', category: 'pizza', cuisine: 'Italian', price: 12.99, rating: 4.5, deliveryTime: 30, image: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/HD-Pictures-Food-620x388.jpg' },
  { id: 2, name: 'Chicken Biryani', category: 'biryani', cuisine: 'Indian', price: 15.99, rating: 4.7, deliveryTime: 35, image: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/HD-Pictures-Food-620x388.jpg' },
  { id: 3, name: 'Vegetable Curry', category: 'curry', cuisine: 'Indian', price: 10.99, rating: 4.2, deliveryTime: 25, image: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Italian-food-download-hd-wallpapers-620x349.jpg' },
  { id: 4, name: 'Beef Burger', category: 'burger', cuisine: 'American', price: 13.99, rating: 4.6, deliveryTime: 20, image: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Perfect-food-backgrounds-for-desktop-620x388.jpg' },
  { id: 5, name: 'Paneer Tikka', category: 'appetizer', cuisine: 'Indian', price: 11.99, rating: 4.4, deliveryTime: 30, image: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Photos-Food-HD-620x388.jpg' },
  { id: 6, name: 'Fish and Chips', category: 'seafood', cuisine: 'British', price: 14.99, rating: 4.3, deliveryTime: 25, image: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-Wallpapers-HD-Free-Download-620x397.jpg' },
]

const categories = ['all', 'pizza', 'biryani', 'curry', 'burger', 'appetizer', 'seafood']
const cuisines = ['All', 'Italian', 'Indian', 'American', 'British']

const offers = [
    {
      id: 1,
      title: 'Summer Special',
      description: '20% off on all salads',
      image: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Fresh-hot-delicious-food-wallpaper.jpg', // Consider using images you control
    },
    {
      id: 2,
      title: 'Family Feast',
      description: 'Buy 2 large pizzas, get 1 free',
      image: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-Images-For-Desktop.jpg', // Consider using images you control
    },
    {
      id: 3,
      title: 'Healthy Choice',
      description: 'Free drink with any vegan meal',
      image: 'https://www.pixelstalk.net/wp-content/uploads/2016/08/Desktop-Food-Images-Download.jpg', // Consider using images you control
    },
  ];

export default function DeliveryDashboard() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
  const [cart, setCart] = useState([])
  const [priceRange, setPriceRange] = useState([0, 20])
  const [selectedCuisines, setSelectedCuisines] = useState(['All'])
  const [sortBy, setSortBy] = useState('featured')
  const [maxDeliveryTime, setMaxDeliveryTime] = useState(60)

  const filteredAndSortedFoodItems = foodItems
    .filter(item => 
      (activeCategory === 'all' || item.category === activeCategory) &&
      item.price >= priceRange[0] && item.price <= priceRange[1] &&
      (selectedCuisines.includes('All') || selectedCuisines.includes(item.cuisine)) &&
      item.deliveryTime <= maxDeliveryTime
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return a.price - b.price
        case 'price-high-low':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'delivery-time':
          return a.deliveryTime - b.deliveryTime
        default:
          return 0
      }
    })

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem.quantity === 1) {
      setCart(cart.filter(cartItem => cartItem.id !== item.id))
    } else {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      ))
    }
  }

  const nextOffer = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length)
  }

  const prevOffer = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex - 1 + offers.length) % offers.length)
  }

  useEffect(() => {
    const timer = setInterval(nextOffer, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen  backdrop-blur-lg">
      {/* Navbar */}
      <nav className=" shadow-md sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="flex-shrink-0 text-2xl font-bold text-primary"><Link href='/'> FoodieExpress</Link></span>
              <div className="hidden md:flex md:ml-6 md:space-x-4">
                <Button variant="ghost"><Home className="mr-2 h-4 w-4" />Home</Button>
                <Button variant="ghost"><User className="mr-2 h-4 w-4" />Account</Button>
                <Button variant="ghost">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                 <Link href='/dashboard/cart'>Cart</Link> 
                  {cart.length > 0 && (
                    <Badge variant="destructive" className="ml-2">{cart.length}</Badge>
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full" />
              </div>
              <Avatar className="ml-4">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8 ">
        {/* Slideshow */}
        <div className="relative mb-8 rounded-lg overflow-hidden shadow-xl">
      <div className="aspect-w-2 aspect-h-4">
        <Image
        width={800}
        height={100}
          src={offers[currentOfferIndex].image}
          alt={offers[currentOfferIndex].title}
          className="object-cover w-full h-full" // Ensure image fills the container
        />
        <div className="absolute inset-0   bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-2">{offers[currentOfferIndex].title}</h2>
            <p className="text-xl">{offers[currentOfferIndex].description}</p>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-75"
        onClick={prevOffer}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous offer</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-75"
        onClick={nextOffer}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next offer</span>
      </Button>
    </div>

        {/* Filters and Sorting */}
        <div className="mb-8 p-4 rounded-lg shadow">
          <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1 min-w-[200px]">
              <h3 className="text-lg font-semibold mb-2">Price Range</h3>
              <Slider
                min={0}
                max={20}
                step={0.5}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span>${priceRange[0].toFixed(2)}</span>
                <span>${priceRange[1].toFixed(2)}</span>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-lg font-semibold mb-2">Cuisine</h3>
              <div className="flex flex-wrap gap-2">
                {cuisines.map((cuisine) => (
                  <Label key={cuisine} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedCuisines.includes(cuisine)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCuisines([...selectedCuisines, cuisine])
                        } else {
                          setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine))
                        }
                      }}
                    />
                    <span>{cuisine}</span>
                  </Label>
                ))}
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-lg font-semibold mb-2">Max Delivery Time</h3>
              <Slider
                min={10}
                max={60}
                step={5}
                value={[maxDeliveryTime]}
                onValueChange={([value]) => setMaxDeliveryTime(value)}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span>{maxDeliveryTime} minutes</span>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-lg font-semibold mb-2">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="delivery-time">Delivery Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Categories */}
        <Tabs value={activeCategory} className="mb-8">
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className="px-4 py-2"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredAndSortedFoodItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full"
                    onClick={() => addToCart(item)}
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to favorites</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-2">{item.name}</CardTitle>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{item.rating}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{item.deliveryTime} min</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{item.price.toFixed(2)}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="mr-2">
                  {item.category}
                </Badge>
                <Badge variant="outline">
                  {item.cuisine}
                </Badge>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center">
                  <Button variant="outline" size="icon" onClick={() => removeFromCart(item)}>
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <span className="mx-2">
                    {cart.find(cartItem => cartItem.id === item.id)?.quantity || 0}
                  </span>
                  <Button variant="outline" size="icon" onClick={() => addToCart(item)}>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
                <Button onClick={() => addToCart(item)}>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className=" backdrop-blur-md text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p>FoodieExpress is your go-to app for delicious meals delivered right to your doorstep.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">Facebook</a>
                <a href="#" className="hover:text-gray-300">Twitter</a>
                <a href="#" className="hover:text-gray-300">Instagram</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Download Our App</h3>
              <div className="flex space-x-4">
                <Button variant="outline">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.08-.46-2.07-.48-3.19 0-1.42.62-2.17.53-3.06-.36C3.33 16.05 4.81 8.26 9.09 8c1.09.04 1.86.66 2.75.71.89.05 1.65-.57 2.79-.61 1.92-.07 3.38.95 4.28 2.57-3.74 2.19-3.15 7.89.7 9.39-.57.89-1.41 1.83-2.56 2.22zm-3.14-19.12c-2.18 1.19-2.18 4.24-.06 5.4 1.82-1.3 1.93-4.21.06-5.4z"/>
                  </svg>
                  App Store
                </Button>
                <Button variant="outline">
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186c.181.087.384.134.597.134h.798l10.418-10.321L4.994 1.68H4.206c-.213 0-.416.048-.597.134zm10.831 10.309l2.116 2.113 3.366-1.68c.462-.232.772-.715.772-1.267v-.574c0-.551-.31-1.033-.772-1.265l-3.366-1.681-2.116 2.113L12 12.121l2.44.002z"/>
                  </svg>
                  Google Play
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 text-center">
            <p>&copy; 2023 FoodieExpress. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
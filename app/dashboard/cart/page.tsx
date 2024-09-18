'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// This would typically come from a global state management solution like Redux or Context
const initialCartItems = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 2, image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Chicken Biryani', price: 15.99, quantity: 1, image: '/placeholder.svg?height=100&width=100' },
  { id: 4, name: 'Beef Burger', price: 13.99, quantity: 1, image: '/placeholder.svg?height=100&width=100' },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // Assuming 10% tax
  const total = subtotal + tax - discount

  const applyPromoCode = () => {
    // This is a simple example. In a real app, you'd validate the promo code against a backend.
    if (promoCode === 'DISCOUNT10') {
      setDiscount(subtotal * 0.1)
    } else {
      setDiscount(0)
    }
  }

  useEffect(() => {
    // Reset discount when cart items change
    setDiscount(0)
    setPromoCode('')
  }, [cartItems])

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <Link href="/dashboard" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-600">Your cart is empty</p>
              <Link href="/" passHref>
                <Button className="mt-4">Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-8">
              <CardContent className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-6  text-white flex items-center">
                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover mr-4" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium ">{item.name}</h3>
                      <p className="mt-1 text-sm text-white">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-4"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch">
                <div className="flex mb-4">
                  <Input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="mr-2"
                  />
                  <Button onClick={applyPromoCode}>Apply</Button>
                </div>
                <Button className="w-full">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
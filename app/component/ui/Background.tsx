import React from 'react'

// ===================== Futuristic Background =====================

export default function Background1() {
    return (
        <div className="fixed inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true" >

            {/* First Gradient Layer with Pulsing */}
            <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] via-[#9089fc] to-[#80ffea] opacity-70 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse"
                style={{
                    clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />

            {/* Second Gradient Layer with Slow Spin */}
            <div
                className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-r from-[#80ffea] via-[#fcff80] to-[#ff80b5] opacity-50 animate-spin-slow"
                style={{
                    clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />

            {/* SVG Geometric Shapes with Animations */}
            <div className="absolute inset-0 flex justify-center items-center opacity-80">
                {/* Spinning Circle */}
                <svg
                    className="animate-spin-slow text-blue-400 w-64 h-64"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
               
                >
                    <circle cx="12" cy="12" r="10" />
                </svg>

                {/* Bouncing Hexagon */}
                <svg
                    className="absolute left-20 bottom-20 animate-bounce text-teal-400 w-32 h-32"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  
                >
                    <polygon points="12 2 19 6.5 19 17.5 12 22 5 17.5 5 6.5 12 2" />
                </svg>

                {/* Pulsing Square */}
                <svg
                    className="absolute right-20 top-20 w-40 h-40 animate-pulse text-pink-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  
                >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                </svg>
            </div>

            {/* Additional Layer with Diagonal Gradient Movement */}
            <div
                className="absolute w-[50rem] h-[30rem] -top-32 left-32 bg-gradient-to-bl from-purple-500 via-pink-500 to-yellow-500 opacity-40 transform-gpu rotate-[45deg] animate-diagonal-move"
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                }}
            />

        </div>
    )
}

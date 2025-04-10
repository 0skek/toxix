"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchIcon } from "lucide-react"

export default function AQIPrediction() {
  const [location, setLocation] = useState("")
  const [result, setResult] = useState<null | { aqi: number; level: string; color: string }>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // This would typically be an API call to get real AQI data
    // For demo purposes, we're generating a random AQI value
    const aqi = Math.floor(Math.random() * 300)
    let level = "Good"
    let color = "bg-green-100 text-green-800"

    if (aqi > 250) {
      level = "Hazardous"
      color = "bg-purple-100 text-purple-800"
    } else if (aqi > 200) {
      level = "Very Unhealthy"
      color = "bg-red-100 text-red-800"
    } else if (aqi > 150) {
      level = "Unhealthy"
      color = "bg-orange-100 text-orange-800"
    } else if (aqi > 100) {
      level = "Unhealthy for Sensitive Groups"
      color = "bg-yellow-100 text-yellow-800"
    } else if (aqi > 50) {
      level = "Moderate"
      color = "bg-blue-100 text-blue-800"
    }

    setResult({ aqi, level, color })
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">AQI Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={!location.trim()}>
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {result && (
              <div className="mt-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium">Air Quality for {location}</h3>
                </div>
                <div className={`p-4 rounded-lg ${result.color}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">AQI</span>
                    <span className="text-2xl font-bold">{result.aqi}</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium">{result.level}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-2">Last updated: {new Date().toLocaleTimeString()}</div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

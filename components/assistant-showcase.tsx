"use client"

import { SplineRobot } from "./spline-robot"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Brain, Shield, Sparkles } from "lucide-react"

export function AssistantShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            AI-Powered
          </Badge>
          <h2 className="text-4xl font-bold mb-6">Meet your AI business assistant</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced AI assistant handles the boring parts of running your business, so you can focus on what
            matters most - growing your company.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="h-[500px] w-full">
              <SplineRobot className="w-full h-full" />
            </div>

            {/* Floating capability cards */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Auto-categorizing</span>
              </div>
            </div>

            <div className="absolute top-1/2 -right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Learning patterns</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Secure processing</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Intelligent automation at work</h3>
              <p className="text-gray-600 mb-6">
                Watch as our AI assistant seamlessly handles your business operations, from invoice processing to
                expense categorization, all while learning your preferences and improving over time.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  icon: Sparkles,
                  title: "Smart categorization",
                  description: "Automatically sorts expenses and income with 99% accuracy",
                },
                {
                  icon: Brain,
                  title: "Predictive insights",
                  description: "Forecasts cash flow and identifies potential issues early",
                },
                {
                  icon: Zap,
                  title: "Instant processing",
                  description: "Handles thousands of transactions in seconds, not hours",
                },
                {
                  icon: Shield,
                  title: "Bank-level security",
                  description: "Enterprise-grade encryption protects all your data",
                },
              ].map((feature, i) => (
                <Card key={i} className="p-4 hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button size="lg" className="bg-black text-white hover:bg-gray-800">
              Try AI Assistant
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export interface DayImages {
  day: number
  images: string[]
  totalCount: number
}

// Generate image paths based on pattern
export function generateDayImages(day: number): DayImages {
  const imageCounts = {
    1: 9,   // day1-1.webp to day1-9.webp
    2: 11,  // day2-1.webp to day2-11.webp  
    3: 9    // day3-1.webp to day3-9.webp
  }
  
  const count = imageCounts[day as keyof typeof imageCounts] || 0
  const images: string[] = []
  
  for (let i = 1; i <= count; i++) {
    images.push(`/bento/day${day}-${i}.webp`)
  }
  
  return {
    day,
    images,
    totalCount: count
  }
}

// Generate all days data
export function generateAllDaysImages(): DayImages[] {
  return [1, 2, 3].map(day => generateDayImages(day))
}

// Generate activity titles (generic but meaningful)
export function generateActivityTitle(day: number, index: number): { title: string; subtitle: string } {
  const activities = {
    1: [
      { title: "Welcome Session", subtitle: "Getting started" },
      { title: "Team Formation", subtitle: "Building connections" },
      { title: "Tool Introduction", subtitle: "Learning basics" },
      { title: "First Project", subtitle: "Hands-on start" },
      { title: "Basic Coding", subtitle: "Programming intro" },
      { title: "Electronics Lab", subtitle: "Circuit basics" },
      { title: "Design Thinking", subtitle: "Creative process" },
      { title: "Collaboration", subtitle: "Working together" },
      { title: "Day 1 Wrap-up", subtitle: "Reflection time" }
    ],
    2: [
      { title: "Advanced Building", subtitle: "Complex projects" },
      { title: "Programming Logic", subtitle: "Code structure" },
      { title: "Sensor Integration", subtitle: "Hardware meets software" },
      { title: "Problem Solving", subtitle: "Debug & fix" },
      { title: "Creative Design", subtitle: "Innovation time" },
      { title: "Testing Phase", subtitle: "Quality check" },
      { title: "Peer Review", subtitle: "Feedback session" },
      { title: "Optimization", subtitle: "Make it better" },
      { title: "Documentation", subtitle: "Record progress" },
      { title: "Presentation Prep", subtitle: "Show & tell ready" },
      { title: "Day 2 Demo", subtitle: "Share your work" }
    ],
    3: [
      { title: "Final Assembly", subtitle: "Putting it together" },
      { title: "Last Testing", subtitle: "Everything works" },
      { title: "Presentation Setup", subtitle: "Demo preparation" },
      { title: "Showcase Time", subtitle: "Present projects" },
      { title: "Peer Judging", subtitle: "Vote for favorites" },
      { title: "Awards Ceremony", subtitle: "Celebrate success" },
      { title: "Reflection Circle", subtitle: "What we learned" },
      { title: "Future Planning", subtitle: "Next steps" },
      { title: "Goodbye & Networking", subtitle: "Stay connected" }
    ]
  }
  
  const dayActivities = activities[day as keyof typeof activities] || []
  return dayActivities[index] || { title: `Activity ${index + 1}`, subtitle: "Learning experience" }
}

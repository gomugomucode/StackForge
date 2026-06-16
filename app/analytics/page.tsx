import { XPGrowthChart } from "@/components/analytics/XPGrowthChart"

export default async function AnalyticsPage() {
  const xpData = [
    { date: "2024-01-01", xp: 100 },
    { date: "2024-01-02", xp: 250 },
    { date: "2024-01-03", xp: 400 },
    { date: "2024-01-04", xp: 300 },
    { date: "2024-01-05", xp: 600 },
    { date: "2024-01-06", xp: 800 },
    { date: "2024-01-07", xp: 1100 },
  ]

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8 text-white">Learning Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">XP Growth</h2>
          <XPGrowthChart data={xpData} />
        </div>
        
        <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Skill Mastery</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Radar Chart Implementation (SVG)
          </div>
        </div>
      </div>
    </div>
  )
}

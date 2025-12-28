// components/dashboard/KpiSummaryCards.tsx
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Target } from "lucide-react";

function getKPIColor(kpi: number, target: number) {
  const percentage = (kpi / target) * 100;
  if (percentage >= 90) return "text-success";
  if (percentage >= 70) return "text-warning";
  return "text-destructive";
}

export default function KpiSummaryCards({
  teamAverageKPI,
  targetKPI,
  achievedKPI,
  totalMembers,
  activeMembers,
  myKPI,
}: {
  teamAverageKPI: number;
  targetKPI: number;
  achievedKPI: number;
  totalMembers: number;
  activeMembers: number;
  myKPI: number;
}) {
  return (
    <div className="sticky top-[104px] z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="container mx-auto px-6 py-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Team Average KPI</p>
                  <p className={`text-3xl font-bold ${getKPIColor(teamAverageKPI, targetKPI)}`}>
                    {teamAverageKPI}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Target vs Achieved</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-xl font-semibold">{achievedKPI}%</span>
                  <span className="text-sm text-muted-foreground">/ {targetKPI}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${Math.min((achievedKPI / targetKPI) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                  <p className="text-3xl font-bold">{totalMembers}</p>
                  <p className="text-xs text-muted-foreground">{activeMembers} active</p>
                </div>
                <Users className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">My KPI</p>
                  <p className={`text-3xl font-bold ${getKPIColor(myKPI, targetKPI)}`}>{myKPI}%</p>
                  <p className="text-xs text-muted-foreground">Team Leader</p>
                </div>
                <Target className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
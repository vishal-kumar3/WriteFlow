import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

type AnalyticsCardProps = {
  title: string;
  action: (userId: string) => Promise<number>;
  userId: string;
};

const AnalyticsCard = async ({ title, action, userId }: AnalyticsCardProps) => {

  const data = await action(userId);

  return (
    <Card className="w-full hover:border-blue-300 transition-all ease-in-out">
      <CardHeader>
        <CardTitle>{data || 0}</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AnalyticsCard

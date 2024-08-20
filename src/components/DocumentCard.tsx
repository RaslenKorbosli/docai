import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Doc } from '../../convex/_generated/dataModel';
import { Button } from './ui/button';

export default function DocumentCard({
  document,
}: {
  document: Doc<'documents'>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{document.docName}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  );
}

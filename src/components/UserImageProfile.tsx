import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function UserImageProfile({
  firstName,
  lastName,
  ImageUrl,
}: {
  firstName: string;
  lastName: string;
  ImageUrl: string;
}) {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={ImageUrl} />
      <AvatarFallback className="bg-slate-200">
        {firstName.slice(0, 1)}
        {lastName.slice(0, 1)}
      </AvatarFallback>
    </Avatar>
  );
}

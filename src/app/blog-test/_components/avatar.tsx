import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  // Extract initials from name (e.g., "Pranav K" -> "PK")
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  };

  return (
    <div className="flex items-center">
      <ShadcnAvatar className="w-12 h-12 mr-4">
        <AvatarImage src={picture} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </ShadcnAvatar>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;

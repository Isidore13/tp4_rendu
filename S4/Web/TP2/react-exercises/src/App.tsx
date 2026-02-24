import './App.css'

interface ProfileCardProps {
    name: string;
    bio: string;
    avatarUrl: string;
    isOnline?: boolean;
}

function ProfileCard({name, bio, avatarUrl, isOnline}: ProfileCardProps) {
  return (
      <>
          <h1>Vous êtes bien sur le profil de {name}</h1>
          <p>{bio}</p>
          {avatarUrl && <img src={avatarUrl} alt={name} />}
          <p>Statut : {isOnline ? '🟢 Actif' : '🔴 Inactif'}</p>
      </>
  )
}

export default ProfileCard

import ProfileCard from './ProfileCard';

function App() {
    return(
        <ProfileCard
            name="Alice Dupont"
            bio="Développeuse frontend"
            avatarUrl="https://i.pravatar.cc/150?img=1"
            isOnline={true}
        />
    )
}

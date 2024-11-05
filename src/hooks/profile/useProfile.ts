import { useState, useEffect } from 'react';
import { Profile } from '@/interfaces/profile';
import { useCurrentUser } from '@/hooks/auth/userCurrentUser';
import { ProfileService } from "@/services/profile.service";

export const useProfile = () => {
    const { user: currentUser } = useCurrentUser();
    const [profileData, setProfileData] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (currentUser?.token && currentUser?.email) {
                const profileService = new ProfileService("https://beard-nest.vercel.app/");
                try {
                    const profile = await profileService.getProfile(currentUser.token, currentUser.email);
                    setProfileData(profile);
                } catch (err) {
                    console.log("Error fetching profile: ", err);
                }
            } else {
                console.warn("No token or email found in CurrentUser.");
            }
        };

        fetchProfile();
    }, [currentUser]); // Dependency array includes currentUser to refetch on changes

    return { profileData };
};

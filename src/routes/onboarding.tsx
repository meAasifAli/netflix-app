import { CirclePlus } from "lucide-react"

export default function Onboarding() {
    const users = [
        {
            name: 'John Doe',
            profile: "/user-frame.png"
        },
        {
            name: 'Jane Doe',
            profile: "/user-frame.png"
        },
        {
            name: 'Bob Doe',
            profile: "/user-frame.png"
        },
        {
            name: 'Aasif Ali',
            profile: "/user-frame.png"
        },
        {
            name: 'Arshid',
            profile: "/user-frame.png"
        },
        {
            name: 'Aliya',
            profile: "/user-frame.png"
        }
    ]
    return(
        <div className="flex flex-col gap-4 md:gap-8 items-center justify-center min-h-screen w-screen">
            <h2 className="text-4xl font-semibold text-center">Who&apos; Watching?</h2>
            <div className="max-w-3xl mx-auto w-full mt-4 flex items-start gap-4 md:gap-8 justify-start">
                <div className="flex  items-center justify-center flex-wrap gap-4 md:gap-8">
                         {
                            users?.map((user)=>(
                                <div key={user.name} className="flex flex-col items-center justify-center gap-2">
                                    <img src={user.profile} alt="profile" className="w-30 h-30 object-cover"/>
                                    <span className="text-sm text-muted-foreground text-center">{user?.name}</span>
                                </div>
                            ))
                         }
                </div>
                <div className="flex items-center flex-col justify-start gap-4 mt-8">
                    <CirclePlus className="size-30"/>
                    <span className="text-sm text-muted-foreground text-center">Add Profile</span>
                </div>
            </div>
        </div>
    )
}
"use client"
import {
    AtSign,
    Calendar,
    Edit,
    FileText,
    Globe,
    Lock,
    MapPin,
    Phone,
    Shield,
    ShoppingBag,
    User,
    UserCog,
} from "lucide-react"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

const userData = {
    id: "u-1234",
    name: "Sophia Anderson",
    email: "sophia@example.com",
    avatar: "/placeholder.svg?height=128&width=128",
    role: "Senior Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    website: "sophiaanderson.com",
    joined: "March 2020",
    lastActive: "Today at 2:34 PM",
    bio: "Product manager with 8+ years of experience in SaaS and e-commerce. Passionate about creating user-centered solutions that drive business growth.",
    skills: ["Product Strategy", "User Research", "Agile", "Data Analysis", "Team Leadership"],
    stats: {
        projects: 24,
        completedTasks: 348,
        openTasks: 12,
        teamSize: 8,
    },
    recentActivity: [
        {id: 1, action: "Updated project timeline", project: "Mobile App Redesign", time: "2 hours ago"},
        {id: 2, action: "Commented on task", project: "Q2 Roadmap", time: "Yesterday"},
        {id: 3, action: "Completed task", project: "User Research", time: "2 days ago"},
        {id: 4, action: "Created new project", project: "Analytics Dashboard", time: "1 week ago"},
        {id: 5, action: "Assigned task to team", project: "Feature Development", time: "1 week ago"},
    ],
    accountSettings: {
        twoFactorEnabled: true,
        emailNotifications: true,
        profileVisibility: "Team Only",
        dataSharing: "Minimal",
    }
}

export function UserProfile() {
    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <Card className="flex-1">
                    <CardHeader className="flex flex-col md:flex-row md:items-center md:gap-4">
                        <Avatar className="h-20 w-20 border-4 border-background">
                            <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name}/>
                            <AvatarFallback>
                                {userData.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                                <Badge variant="outline" className="ml-2">
                                    {userData.role}
                                </Badge>
                            </div>
                            <CardDescription className="flex items-center gap-1">
                                <AtSign className="h-3.5 w-3.5"/>
                                {userData.email}
                            </CardDescription>
                            <CardDescription className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5"/>
                                {userData.location}
                            </CardDescription>
                        </div>
                        <Button size="sm" className="mt-4 md:mt-0">
                            <Edit className="mr-2 h-4 w-4"/>
                            Edit Profile
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium">Bio</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{userData.bio}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Skills</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {userData.skills.map((skill) => (
                                        <Badge key={skill} variant="secondary">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 md:w-fit">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 pt-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Projects</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{userData.stats.projects}</div>
                                <p className="text-xs text-muted-foreground">+2 added this month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{userData.stats.completedTasks}</div>
                                <p className="text-xs text-muted-foreground">+28 this month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{userData.stats.openTasks}</div>
                                <p className="text-xs text-muted-foreground">-4 since last week</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Team Size</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{userData.stats.teamSize}</div>
                                <p className="text-xs text-muted-foreground">+1 new member</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Phone</p>
                                        <p className="text-sm text-muted-foreground">{userData.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <AtSign className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Email</p>
                                        <p className="text-sm text-muted-foreground">{userData.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Website</p>
                                        <p className="text-sm text-muted-foreground">{userData.website}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Location</p>
                                        <p className="text-sm text-muted-foreground">{userData.location}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="col-span-1">
                            <CardHeader>
                                <CardTitle>Account Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Department</p>
                                        <p className="text-sm text-muted-foreground">{userData.department}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <UserCog className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Role</p>
                                        <p className="text-sm text-muted-foreground">{userData.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Joined</p>
                                        <p className="text-sm text-muted-foreground">{userData.joined}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-muted-foreground"/>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">Last Active</p>
                                        <p className="text-sm text-muted-foreground">{userData.lastActive}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest actions and updates from {userData.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {userData.recentActivity.map((activity, index) => (
                                    <div key={activity.id} className="flex flex-col space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium">{activity.action}</p>
                                            <Badge variant="outline">{activity.time}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Project: {activity.project}</p>
                                        {index < userData.recentActivity.length - 1 && <Separator className="mt-2"/>}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                View All Activity
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4 pt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>Manage your account preferences and security settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Shield className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        <p className="font-medium">Two-Factor Authentication</p>
                                        <p className="text-sm text-muted-foreground">Add an extra layer of security to
                                            your account</p>
                                    </div>
                                </div>
                                <Badge variant={userData.accountSettings.twoFactorEnabled ? "default" : "outline"}>
                                    {userData.accountSettings.twoFactorEnabled ? "Enabled" : "Disabled"}
                                </Badge>
                            </div>
                            <Separator/>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <AtSign className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        <p className="font-medium">Email Notifications</p>
                                        <p className="text-sm text-muted-foreground">Receive updates about your account
                                            activity</p>
                                    </div>
                                </div>
                                <Badge variant={userData.accountSettings.emailNotifications ? "default" : "outline"}>
                                    {userData.accountSettings.emailNotifications ? "Enabled" : "Disabled"}
                                </Badge>
                            </div>
                            <Separator/>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Lock className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        <p className="font-medium">Profile Visibility</p>
                                        <p className="text-sm text-muted-foreground">Control who can see your profile
                                            information</p>
                                    </div>
                                </div>
                                <Badge variant="outline">{userData.accountSettings.profileVisibility}</Badge>
                            </div>
                            <Separator/>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ShoppingBag className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        <p className="font-medium">Data Sharing</p>
                                        <p className="text-sm text-muted-foreground">Manage how your data is used and
                                            shared</p>
                                    </div>
                                </div>
                                <Badge variant="outline">{userData.accountSettings.dataSharing}</Badge>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

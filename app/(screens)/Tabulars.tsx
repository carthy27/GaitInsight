import {Tabs } from "expo-router";

export default function Tabulars() {
    return (
        <Tabs> 
            <Tabs.Screen name= "about"options={{ title: 'Home'}}/>
            <Tabs.Screen name= "Register" options={{title: 'Register'}} />
        </Tabs>
    )
}


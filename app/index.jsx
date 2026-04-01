import { Redirect } from "expo-router";

export default function Index () {
    const isAuthenticated = false;
    return isAuthenticated
        ? <Redirect href="/(app)/home"/>
        : <Redirect href="/(auth)/login" />;
}
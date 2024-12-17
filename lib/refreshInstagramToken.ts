import { refreshInstagramToken } from "./instagramToken";


async function main() {
  try {
    const result = await refreshInstagramToken();
    console.log("Successfully refreshed Instagram token:", {
      expiresIn: result.expires_in,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to refresh Instagram token:", error);
    process.exit(1);
  }
}

main();

import fs from "fs/promises";
import path from "path";

const TOKEN_FILE_PATH = path.join(process.cwd(), ".env");

interface TokenData {
  access_token: string;
  expires_in: number;
  last_refreshed: number;
}

async function updateEnvFile(newToken: string) {
  try {
    const envContent = await fs.readFile(TOKEN_FILE_PATH, "utf-8");
    const updatedContent = envContent.replace(
      /INSTAGRAM_ACCESS_TOKEN=.*/,
      `INSTAGRAM_ACCESS_TOKEN="${newToken}"`
    );
    await fs.writeFile(TOKEN_FILE_PATH, updatedContent);
  } catch (error) {
    console.error("Error updating .env file:", error);
  }
}

export async function refreshInstagramToken() {
  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!currentToken) {
    throw new Error(
      "Instagram access token not found in environment variables"
    );
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data: TokenData = await response.json();

    // Update the token in the .env file
    await updateEnvFile(data.access_token);

    return data;
  } catch (error) {
    console.error("Error refreshing Instagram token:", error);
    throw error;
  }
}

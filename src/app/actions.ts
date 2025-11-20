"use server";

import { contactFormSchema } from '@/lib/schemas';

/**
 * Handles the submission of the contact form.
 * In a real application, this is where you'd integrate with an email service like SendGrid.
 * @param data The validated form data.
 * @returns An object with success status and a message or an error.
 */
export async function submitContactForm(data: unknown) {
    const parsedData = contactFormSchema.safeParse(data);

    if (!parsedData.success) {
        return { success: false, error: "Invalid form data." };
    }

    const { name, email, message } = parsedData.data;

    console.log("New contact form submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // TODO: Implement email sending logic here (e.g., using SendGrid)
    // Example:
    // const sendGridApiKey = process.env.SENDGRID_API_KEY;
    // if (!sendGridApiKey) {
    //   console.error("SendGrid API key is not configured.");
    //   return { success: false, error: "Server configuration error." };
    // }
    // ... send email logic ...
    
    // For now, we'll just simulate a success response.
    return { success: true, message: "Form submitted successfully." };
}

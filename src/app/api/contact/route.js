export async function POST(req) {
  const body = await req.json();
  const {
    name,
    email,
    phone,
    message,
    package: selectedPackage,
    serviceType,
  } = body;

  // ✅ Validation - Updated field names to match your form
  if (!name || !email || !phone || !message) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 }
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return new Response(JSON.stringify({ message: "Invalid email format" }), {
      status: 400,
    });
  }

  if (name.length < 2) {
    return new Response(
      JSON.stringify({ message: "Name must be at least 2 characters" }),
      { status: 400 }
    );
  }

  // Updated phone validation - more flexible for international numbers
  if (phone && !/^\+?[\d\s\-\(\)]+$/.test(phone)) {
    return new Response(
      JSON.stringify({ message: "Invalid phone number format" }),
      { status: 400 }
    );
  }

  if (message.length < 10) {
    return new Response(
      JSON.stringify({ message: "Message must be at least 10 characters" }),
      { status: 400 }
    );
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: process.env.BREVO_SENDER_NAME || "KenyaFiber Contact Form",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: process.env.ADMIN_EMAIL,
            name: "KenyaFiber Admin",
          },
        ],
        subject: `New Internet Service Inquiry from ${name}`,
        htmlContent: `
<div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 0; max-width: 600px; margin: auto; color: #333; border: 1px solid #e9ecef;">
  <!-- Header -->
  <div style="background-color: #007bff; padding: 25px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px; letter-spacing: 1px;">KENYA</h1>
    <p style="color: #e6f3ff; margin: 5px 0 0; font-size: 14px; letter-spacing: 2px;">FIBER</p>
  </div>
  
  <!-- Content area -->
  <div style="padding: 30px;">
    <h2 style="text-align: center; color: #007bff; margin-bottom: 25px; font-size: 22px; border-bottom: 1px solid #e9ecef; padding-bottom: 15px;">🌐 New Internet Service Inquiry 🌐</h2>
    
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
      <tr>
        <td style="padding: 12px 10px; font-weight: 600; width: 35%; color: #007bff;">Full Name:</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e9ecef;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 12px 10px; font-weight: 600; color: #007bff;">Email:</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e9ecef;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 12px 10px; font-weight: 600; color: #007bff;">Phone:</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e9ecef;">${phone}</td>
      </tr>
      <tr>
        <td style="padding: 12px 10px; font-weight: 600; color: #007bff;">Service Type:</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e9ecef;">${serviceType}</td>
      </tr>
      <tr>
        <td style="padding: 12px 10px; font-weight: 600; color: #007bff;">Package:</td>
        <td style="padding: 12px 10px; border-bottom: 1px solid #e9ecef;">${
          selectedPackage || "Not selected"
        }</td>
      </tr>
      <tr>
        <td style="padding: 12px 10px; font-weight: 600; vertical-align: top; color: #007bff;">Message:</td>
        <td style="padding: 12px 10px; white-space: pre-wrap; border-bottom: 1px solid #e9ecef;">${message}</td>
      </tr>
    </table>

    <!-- Call to action -->
    <div style="text-align: center; margin-top: 30px;">
      <a href="mailto:${email}" style="background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: 600; display: inline-block; letter-spacing: 1px;">Reply to Customer</a>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background-color: #007bff; padding: 20px; text-align: center; font-size: 12px; color: white;">
    <p style="margin: 0;">KenyaFiber • Your Best WiFi in the City • <a href="https://kenyafiber.co.ke" style="color: #e6f3ff; text-decoration: none;">kenyafiber.co.ke</a></p>
  </div>
</div>
`,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Brevo error:", result);
      return new Response(
        JSON.stringify({ message: result.message || "Failed to send email" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message:
          "Message sent successfully! We'll get back to you within 24 hours.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

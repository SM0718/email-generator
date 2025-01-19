import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button } from "@heroui/react";

function UserTemplates() {
  const [templates, setTemplates] = useState([]);
  const token = localStorage.getItem('accessToken');
  
  useEffect(() => {
    const getUserTemplates = async () => {
      try {
        const response = await fetch('https://email-generator.up.railway.app/api/v1/templates/get-user-templates', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          alert("Error fetching templates");
          return;
        }

        const data = await response.json();
        console.log(data.data);
        setTemplates(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserTemplates();
  }, []);

  const handleDownload = (templateHTML, index) => {
    // Add the Tailwind CDN link
    const tailwindCDN = `
      <script src="https://cdn.tailwindcss.com"></script>
    `;
  
    // Construct the full HTML with Tailwind
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Template ${index + 1}</title>
          ${tailwindCDN}
        </head>
        <body class='mx-auto w-full h-screen md:w-[700px] md:h-[1000px] px-4'>
          ${templateHTML}
        </body>
      </html>
    `;
  
    // Create a Blob and trigger the download
    const blob = new Blob([fullHTML], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `template-${index + 1}.html`;
    link.click();
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-8">Your Templates</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((category, index) => (
          <Card
            key={index}
            className="h-full relative group overflow-hidden"
            shadow="sm"
            radius="lg"
          >
            <CardBody className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              {/* Render HTML content */}
              <div
                dangerouslySetInnerHTML={{ __html: category.structure }}
                className="w-full h-48 overflow-auto border rounded-lg p-2 bg-white"
              />
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">Template {index + 1}</p>
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => handleDownload(category.structure, index)}
                >
                  Download
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UserTemplates;

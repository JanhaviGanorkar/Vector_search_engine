import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p>
            This application does not collect personal user information. All documents uploaded
            are stored securely and are not shared with third parties.
          </p>
          <p>
            Vector representations of documents are used solely for the purpose of search and are
            stored securely in our database.
          </p>
          <p>
            Communications between client and server are encrypted using HTTPS. Any sensitive
            content is protected from unauthorized access.
          </p>
          <p>
            If you have any concerns or want your data removed, contact the admin through the
            provided support channels.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

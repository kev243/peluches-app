export default function ConfirmationPage() {
  return (
    <div className="max-w-lg mx-auto p-6 text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 my-12">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🎉 Commande confirmée !
        </h1>

        <div className="my-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <p className="text-lg mb-4">
          Votre peluche gratuite sera bientôt expédiée à l'adresse indiquée.
        </p>

        <p className="text-gray-600 mb-6">
          Vous recevrez un email de confirmation avec les détails de livraison.
        </p>

        <a
          href="/"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

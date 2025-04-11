import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  //   Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface FirstEmailProps {
  firstName?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const FirstEmail = ({ firstName }: FirstEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>🎊Merci pour votre toute première commande!</Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/img/logo.png`}
          width={48}
          height={48}
          alt="Logo"
        />
        <Heading style={heading}>
          🎊Merci pour votre toute première commande!
        </Heading>
        <Section style={body}>
          <Text style={paragraph}>
            Bonjour {firstName ? firstName : "cher(e) client(e)"},
          </Text>
          <Text style={paragraph}>
            Nous avons une petite surprise pour vous : après 5 commandes, vous
            recevrez une <strong>peluche gratuite</strong> 🎁
          </Text>
          <Text style={paragraph}>
            Alors, restez avec nous et continuez à commander pour obtenir votre
            cadeau !
          </Text>
        </Section>
        <Text style={paragraph}>
          À très bientôt,
          <br />- Équipe Calinou
        </Text>
        <Hr style={hr} />
        <Img
          src={`${baseUrl}/static/raycast-logo.png`}
          width={32}
          height={32}
          style={{
            WebkitFilter: "grayscale(100%)",
            filter: "grayscale(100%)",
            margin: "20px 0",
          }}
        />
        <Text style={footer}>Calinou Inc.</Text>
        <Text style={footer}>
          2093 Philadelphia Pike #3222, Claymont, DE 19703
        </Text>
      </Container>
    </Body>
  </Html>
);

FirstEmail.PreviewProps = {
  giftLink: "https://calinou.com",
} as FirstEmailProps;

export default FirstEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/static/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};

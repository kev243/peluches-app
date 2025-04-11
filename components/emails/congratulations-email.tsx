import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface CongratulationEmailProps {
  giftLink: string;
  firstName?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const CongratulationEmail = ({
  giftLink,
  firstName,
}: CongratulationEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>🎊🎁Vous avez gagné une peluche gratuite.</Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/img/logo.png`}
          width={48}
          height={48}
          alt="Logo"
        />
        <Heading style={heading}>
          🎊🎁 Félicitations ! Vous avez gagné une peluche gratuite !
        </Heading>
        <Section style={body}>
          <Text style={paragraph}>
            Bonjour {firstName ? firstName : "cher(e) client(e)"},
          </Text>
          <Text style={paragraph}>
            Merci pour vos 5 commandes ! Vous pouvez choisir votre peluche
            gratuite en cliquant sur le lien ci-dessous :
          </Text>
          <Text style={paragraph}>
            <Link style={link} href={giftLink}>
              👉 Choisissez votre peluche gratuite ici 👈
            </Link>
          </Text>
        </Section>
        <Text style={paragraph}>
          Meilleur,
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

CongratulationEmail.PreviewProps = {
  giftLink: "https://calinou.com",
} as CongratulationEmailProps;

export default CongratulationEmail;

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

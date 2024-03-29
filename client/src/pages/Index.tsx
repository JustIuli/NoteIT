import {
    Container,
    Text,
    Button,
    Group,
    Title,
    Badge,
    SimpleGrid, Card, rem,
} from '@mantine/core';
import heroClasses from '../assets/home/hero.module.css';
import featureClasses from '../assets/home/features.module.css';
import AppLayout from "../components/Layouts/AppLayout.tsx";
import {IconCookie, IconSearch, IconUser} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

const featuresItems = [
    {
        title: 'Searching',
        description:
            'Effortlessly find and retrieve your notes with powerful search capabilities. Quickly locate specific information within your notes, even in a large collection.',
        icon: IconSearch,
    },
    {
        title: 'Privacy focused',
        description:
            'Ensure the security of your personal data with our privacy-focused design. Your notes are protected with stringent privacy measures.',
        icon: IconUser,
    },
    {
        title: 'No third parties',
        description:
            'Rest assured that your data remains yours alone. We do not share your notes or personal information with any third parties, ensuring your privacy and security.',
        icon: IconCookie,
    },
];

function Index() {

    const navigate = useNavigate()

    return (
        <AppLayout>
            <div id='hero' className={heroClasses.wrapper}>
                <Container size={800} className={heroClasses.inner}>
                    <h1 className={heroClasses.title}>
                        A{' '}
                        <Text component="span" variant="gradient" gradient={{from: '#364FC7', to: '#22B8CF'}} inherit>
                            fully featured
                        </Text>{' '}
                       note taking app
                    </h1>

                    <Text className={heroClasses.description} size='lg' style={{marginTop: '20px'}}>
                        Enhance your productivity with our sophisticated note-taking solution, enabling seamless
                        organization and management of your daily tasks.
                    </Text>

                    <Group className={heroClasses.controls}>
                        <Button
                            size="xl"
                            onClick={() => navigate('/auth/sign-in')}
                            className={heroClasses.control}
                            variant="gradient"
                            gradient={{from: '#364FC7', to: '#22B8CF'}}
                        >
                            Get started
                        </Button>

                    </Group>
                </Container>
            </div>
            <Container id='features' className={featureClasses.wrapper} size="lg" py="xl">
                <Group justify="center">
                    <Badge variant="gradient" gradient={{from: '#364FC7', to: '#22B8CF'}} size="lg">
                        Made for you
                    </Badge>
                </Group>

                <Title order={2} className={featureClasses.title} ta="center" mt="sm">
                    Tired of forgetting things ?
                </Title>

                <Text className={featureClasses.description} ta="center" mt="md">
                    Explore the comprehensive array of features within our application, tailored to support your memory retention and boost efficiency.
                </Text>

                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                    {
                        featuresItems.map((feature) => (
                            <Card key={feature.title} shadow="md" radius="md" className={featureClasses.card} padding="xl">
                                <feature.icon
                                    style={{ width: rem(50), height: rem(50) }}
                                    stroke={2}
                                    color='#1C7ED6'
                                />
                                <Text fz="lg" fw={500} className={featureClasses.cardTitle} mt="md">
                                    {feature.title}
                                </Text>
                                <Text fz="sm" c="dimmed" mt="sm">
                                    {feature.description}
                                </Text>
                            </Card>
                        ))
                    }
                </SimpleGrid>
            </Container>
        </AppLayout>
    );
}

export default Index

import {ReactNode} from "react";
import {
    ActionIcon,
    Text,
    Container,
    Group,
    rem,
    ThemeIcon,
    useMantineColorScheme, Title
} from "@mantine/core";
import appLayout from "../../assets/home/app.layout.module.css";
import {MoonIcon, Sun} from "lucide-react";
import footerClasses from "../../assets/home/footer.module.css";
import {IconBrandInstagram, IconBrandTwitter, IconBrandYoutube} from "@tabler/icons-react";

const AppLayout = ({children}:{children:ReactNode}) => {
    const data = [
        {
            title: 'About',
            links: [
                { label: 'Features', link: '/#features' },
            ],
        },
        {
            title: 'Project',
            links: [
                { label: 'How was it build?', link: '#' },
            ],
        },
        {
            title: 'Community',
            links: [
                { label: 'Join Discord', link: '#' },
            ],
        },
    ];

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text<'a'>
                key={index}
                className={footerClasses.link}
                component="a"
                href={link.link}
                onClick={(event) => event.preventDefault()}
            >
                {link.label}
            </Text>
        ));

        return (
            <div className={footerClasses.wrapper} key={group.title}>
                <Text className={footerClasses.title}>{group.title}</Text>
                {links}
            </div>
        );
    });
    const { setColorScheme, colorScheme} = useMantineColorScheme();
    return (
        <div className={appLayout.shell}>
            <header className={appLayout.header}>
                <Container size="md" className={appLayout.inner}>
                    <Title className={footerClasses.logoText}>NoteIt</Title>
                    <Group gap={5} visibleFrom="xs">
                        <ThemeIcon variant='subtle'>
                            {
                                colorScheme === 'dark' ?
                                    <Sun onClick={() => setColorScheme('light')} style={{width: '70%', height: '70%'}}/>
                                    :
                                    <MoonIcon onClick={() => setColorScheme('dark')}
                                              style={{width: '70%', height: '70%'}}/>
                            }
                        </ThemeIcon>
                    </Group>
                </Container>
            </header>
            {children}
            <footer className={footerClasses.footer}>
                <Container className={footerClasses.inner}>
                    <div className={footerClasses.logo}>
                        <Title className={footerClasses.logoText}>NoteIt</Title>
                        <Text size="xs" c="dimmed" className={footerClasses.description}>
                            A simple yet effective note taking app
                        </Text>
                    </div>
                    <div className={footerClasses.groups}>{groups}</div>
                </Container>
                <Container className={footerClasses.afterFooter}>
                    <Text c="dimmed" size="sm">
                        © 2024 NoteIt | All rights reserved.
                    </Text>

                    <Group gap={0} className={footerClasses.social} justify="flex-end" wrap="nowrap">
                        <ActionIcon size="lg" color="gray" variant="subtle">
                            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="lg" color="gray" variant="subtle">
                            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="lg" color="gray" variant="subtle">
                            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Container>
            </footer>
        </div>
    );
};

export default AppLayout;
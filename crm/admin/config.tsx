function CustomLogo() {
    return (
        <div style={{ display: 'flex', alignItems: 'start' }}>
            <img
                src="https://storage.yandexcloud.net/sitejuststudy/js-mini.png"
                width={50}
                height={50}
                style={{ objectFit: 'contain', paddingRight: 10 }}
            />
            <h1 style={{ margin: 0 }}>Just Study CRM</h1>
        </div>
    );
}

export const components = {
    Logo: CustomLogo
};

function CustomLogo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
                src="https://storage.yandexcloud.net/sitejuststudy/js-mini.png"
                width={45}
                height={45}
                alt="logo just study"
                style={{ objectFit: 'contain', paddingRight: 10 }}
            />
            <h2 style={{ margin: 0 }}>Just Study CRM</h2>
        </div>
    );
}

export const components = {
    Logo: CustomLogo
};

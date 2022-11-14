import { FC, useEffect, useState } from "react";
import { Banner } from "@shared/components/Banner/Banner";
import travel from "./travel.png";
import talk from "./talk.png";
import avia from "./avia.png";
import med from "./med.png";
import it from "./it.png";
import forYou from "./foryou.png";
import work from "./work.png";
import Image, { StaticImageData } from "next/image";
import { DescWrapper, PictureWrapper } from "@src/pages/Home/MainBanner/style";
import "slick-carousel/slick/slick.css";
import { useRouter } from "next/router";
import { transition } from "@src/shared/lib/transition";
import { ILanguages } from "@src/shared/modules/constants";
import { mainBlock } from "@translations/mainBlock";

export interface ISlide {
    title: string;
    image: StaticImageData;
}

const slidesImages = [travel, talk, forYou, avia, med, it, work];

export const MainBanner: FC = () => {
    const { locale } = useRouter();
    const t = transition(mainBlock, locale as ILanguages);
    const [activeSlide, setActiveSlide] = useState<ISlide>({ title: t.cards[0], image: slidesImages[0] });
    const [slideNumber, setSlideNumber] = useState(0);

    useEffect(() => {
        if (slideNumber < t.cards.length) {
            setTimeout(() => {
                setSlideNumber(slideNumber + 1);
                setActiveSlide({ title: t.cards[slideNumber], image: slidesImages[slideNumber] });
            }, 4000);
        }
        if (slideNumber === t.cards.length) {
            setSlideNumber(0);
            setActiveSlide({ title: t.cards[6], image: slidesImages[6] });
        }
    }, [slideNumber, t.cards]);

    return (
        <>
            <Banner
                key={activeSlide.title}
                title={t.title}
                desc={
                    <DescWrapper color="white" steps={activeSlide.title.length} variant="h3">
                        {activeSlide.title}
                    </DescWrapper>
                }
                picture={
                    <PictureWrapper minHeight={560} display={{ xs: 'none', md: 'block' }}>
                        <div>
                            <Image
                                className="fade-appearance"
                                style={{ marginTop: 40, objectFit: 'cover' }}
                                src={activeSlide.image}
                                alt={t.title}
                                placeholder="blur"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                            />
                        </div>
                    </PictureWrapper>
                }
                buttonText={t.buttonText}
            />
        </>
    );
};

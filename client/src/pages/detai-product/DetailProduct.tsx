import { useQuery } from "@apollo/client";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PinterestIcon from "@mui/icons-material/Pinterest";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Container, Divider, Grid, Rating } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import {
  Controller,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../../components/button/Button";
import ModalCustom from "../../components/modal/ModalCustom";
import ProductItem, {
  ProductItemProps,
} from "../../components/productItem/ProductItem";
import WoocommerTabs from "../../components/woocommerceTabs/WoocommerceTabs";
import { DETAIL_PRODUCT } from "../../graphql/query/Product";
import styles from "./DetailProduct.module.scss";

const cx = classNames.bind(styles);

export default function DetailProduct() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const param = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(DETAIL_PRODUCT, {
    variables: { id: Number(param.id) },
  });

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box sx={{ position: "relative" }}>
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                grabCursor={true}
                navigation={{
                  nextEl: ".next",
                  prevEl: ".prev",
                }}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[FreeMode, Navigation, Thumbs, Controller]}
              >
                {data &&
                  data.detailProduct.product.images.map(
                    (image: string, index: number) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          className={cx("zoom-img")}
                          alt="zoom-img"
                        />
                      </SwiperSlide>
                    )
                  )}
              </Swiper>
              <div className="prev">
                <NavigateBeforeRoundedIcon />
              </div>
              <div className="next">
                <NavigateNextRoundedIcon />
              </div>
              <Swiper
                loop={false}
                spaceBetween={6}
                slidesPerView={4}
                watchSlidesProgress
                touchRatio={0.2}
                slideToClickedSlide={true}
                onSwiper={setThumbsSwiper}
                modules={[Navigation, Thumbs, Controller]}
                className={cx("thumb-swiper")}
              >
                {data &&
                  data.detailProduct.product.images.map(
                    (image: string, index: number) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          className={cx("thumb-img")}
                          alt="thumb-img"
                        />
                      </SwiperSlide>
                    )
                  )}
              </Swiper>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <div className={cx("product-summary")}>
              <h2 className={cx("product-title")}>
                {data?.detailProduct?.product?.name}
              </h2>
              {data?.detailProduct && (
                <div className={cx("product-review")}>
                  <Rating
                    value={data.detailProduct?.product?.averageRating}
                    disabled
                    precision={0.1}
                  />
                  <span className={cx("product-review__count")}>
                    ({data?.detailProduct?.product?.reviews?.length} Reviews)
                  </span>
                </div>
              )}
              <div className={cx("product-price")}>
                <span className={cx("product-price__new")}>
                  $
                  {data?.detailProduct?.product?.price *
                    (1 -
                      data?.detailProduct?.product?.discount?.discount_percent /
                        100)}
                </span>
                <span className={cx("product-price__old")}>
                  ${data?.detailProduct?.product?.price}
                </span>
              </div>
              <span className={cx("product-desc")}>
                Morbi purus libero, faucibus adipiscing, commodo quis, gravida
                id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed
                semper lorem at felis. Vestibulum volutpat, lacus a ultrices
                sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare
                nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus
                sed, urna. Morbi i
              </span>
              <div className={cx("product-qty")}>
                <span>Qty:</span>
                <div className={cx("product-qty__actions")}>
                  <span className={cx("product-qty__icons")}>
                    <RemoveOutlinedIcon sx={{ fontSize: "16px" }} />
                  </span>
                  <span>1</span>
                  <span className={cx("product-qty__icons")}>
                    <AddOutlinedIcon sx={{ fontSize: "16px" }} />
                  </span>
                </div>
              </div>
              <div className={cx("product-actions")}>
                <Button
                  title="Add to cart"
                  leftIcon={
                    <ShoppingCartOutlinedIcon sx={{ fontSize: "20px" }} />
                  }
                  size="lg"
                />
                <button className={cx("product-actions__wishlist")}>
                  <FavoriteBorderOutlinedIcon
                    sx={{ fontSize: "16px", color: "var(--color-primary)" }}
                  />
                  <span>Add to wishlist</span>
                </button>
              </div>
            </div>
            <Divider />
            <div className={cx("product-meta")}>
              <div className={cx("product-category")}>
                <span>Category:</span>
                <ul className={cx("product-category__list")}>
                  {data &&
                    data.detailProduct.product?.categories.map(
                      (
                        category: {
                          id: number;
                          name: string;
                        },
                        index: number
                      ) => {
                        return index ===
                          data.detailProduct.product?.categories.length - 1 ? (
                          <li key={category.id}>{category.name}</li>
                        ) : (
                          <li key={category.id}>{category.name},</li>
                        );
                      }
                    )}
                </ul>
              </div>
              <div className={cx("product-social")}>
                <span>Share:</span>
                <div>
                  <span className={cx("product-social__icon")}>
                    <FacebookRoundedIcon sx={{ fontSize: "16px" }} />
                  </span>
                  <span className={cx("product-social__icon")}>
                    <TwitterIcon sx={{ fontSize: "16px" }} />
                  </span>
                  <span className={cx("product-social__icon")}>
                    <PinterestIcon sx={{ fontSize: "16px" }} />
                  </span>
                  <span className={cx("product-social__icon")}>
                    <LinkedInIcon sx={{ fontSize: "16px" }} />
                  </span>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <WoocommerTabs
          productId={Number(param.id)}
          setOpenModal={setOpenModal}
        />
        <Box sx={{ marginY: "40px" }}>
          <h2 className={cx("related-heading")}>Related products</h2>
          <Box>
            <Swiper
              modules={[Pagination]}
              slidesPerView={4}
              pagination={{ clickable: true }}
              style={{ maxHeight: "500px" }}
              spaceBetween={32}
              breakpoints={{
                300: { slidesPerView: 2 },
                600: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
            >
              {data &&
                data.detailProduct?.relatedProduct?.map(
                  (product: ProductItemProps) => (
                    <SwiperSlide key={product.id}>
                      <ProductItem {...product} />
                    </SwiperSlide>
                  )
                )}
            </Swiper>
          </Box>
        </Box>
      </Container>
      <ModalCustom
        open={openModal}
        action={() => {
          setOpenModal(false);
          navigate("/login");
        }}
        cancelAction={() => setOpenModal(false)}
      />
    </Box>
  );
}

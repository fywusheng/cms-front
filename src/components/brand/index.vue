<template>
    <div class="topic-brand" :name="common.name"  @click="onClick">
        <img v-if="image" :src="image" @touchstart="onTouchStart"/>
        <div class="scroll-container" ref="scrollContainer">
            <ul class="item-list" :style="itemStyle">
                <li class="item" @click="goItem(item)" v-for="(item,index) in itemList" :key="index">
                    <div class="item-logo" v-lazy:background-image="XIU.getImgFormat(item.proPictDir, '/resize,w_750')"></div>
                    <div class="item-name">{{item.productName}}</div>
                    <div class="item-price">
                        &yen;{{item.cuPrice}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll";

    export default {
        props: [ 'mode', 'instance_id', 'common', 'content' ],
        data() {
            return {
                timer: null,
                itemList: [],
            }
        },
        computed: {
            image() {
                return XIU.getAliImg(this.content.image)
            },
            itemStyle(){
                return this.itemList ? {width: `${this.itemList.length*2.66667 + 0.4}rem`} :{};
            }
        },
        methods: {
            onClick() {
                XIU.genLink(this.content.link)
            },
            initScroll() {
                if (this.scroll) {
                    this.scroll.refresh();
                    return;
                }
                this.scroll = new BScroll(this.$refs.scrollContainer, {
                    eventPassthrough: "vertical",
                    scrollX: true,
                    tap: true,
                    preventDefault: false
                });
            },
            onTouchStart() {
                this.timer = setTimeout(() => {
                    this.onCancelTouch();
                }, 1000)
                window.addEventListener('touchmove', this.onCancelTouch)
            },
            onCancelTouch() {
                clearTimeout(this.timer);
                window.removeEventListener('touchmove', this.onCancelTouch);
            }
        },
        mounted() {
            this.$nextTick(this.initScroll.bind(this));
            this.itemList = [
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635189561472653",
                    "originalPrice": 3299,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "styleNo": "R2AA807009",
                    "productName": "CJ西装领阔版腰带大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/3ab471c5-7fae-1cdc-6c1f-fa44eb99a92a",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516351895000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 3299,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635433635933719",
                    "originalPrice": 3599,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "productName": "CJ大翻领阔版大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/84a4e429-c2e0-ce67-8e2e-9fa304cd7fe3",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516354336000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 3599,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635453202089247",
                    "originalPrice": 3299,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "styleNo": "R2AA807014",
                    "productName": "CJ西装领三口袋大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/8513c00a-996e-79c7-2da0-7deac2c3aa07",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516354532000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 3299,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635493254660129",
                    "originalPrice": 3299,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "styleNo": "R2AA807013",
                    "productName": "CJ大翻领腰带大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/ef75b96e-8f2e-cadc-9591-935041c9a513",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516354932000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 3299,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635521265329887",
                    "originalPrice": 3999,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "styleNo": "R2AA807017",
                    "productName": "CJ狐狸毛领腰带大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/d37cefa7-2990-e704-15cf-7caa804a7cb9",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516355212000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 3999,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635611889952277",
                    "originalPrice": 4299,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "styleNo": "R2AA807006",
                    "productName": "CJ立领开叉腰带大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/37f2191e-5b55-c5be-ec97-5c2fa9d8a89a",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516356118000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 4299,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635633240199775",
                    "originalPrice": 3299,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "styleNo": "R2AA807008",
                    "productName": "CJ西装领后开衩大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/4769084a-86fe-ca8c-fbb1-c34f4cdfca8d",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516356332000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 3299,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635653952642416",
                    "originalPrice": 3999,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "styleNo": "R2AA807005",
                    "productName": "CJ风衣款大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/2c769bfc-59e2-1c64-fcc1-eea732425f4f",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516356539000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 3999,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635665743412101",
                    "originalPrice": 3599,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "styleNo": "R2AA807015",
                    "productName": "CJ西装领带腰带大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/1c4c33dd-7e2a-857e-2814-71009519bf0f",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516356657000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 3599,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635678118269308",
                    "originalPrice": 2599,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "styleNo": "R2AA807016",
                    "productName": "CJ腰间抽绳短大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/923790b2-3a0d-aa8d-a28e-32fb36bc8f43",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516356781000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 2599,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635690949621119",
                    "originalPrice": 4299,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "productName": "CJ狐狸毛帽子抽绳大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/7a01be57-69d0-4cb9-b0bb-e4122ee82bc8",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516356909000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 4299,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635708354560417",
                    "originalPrice": 2999,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "styleNo": "R2AA807004",
                    "productName": "CJ风衣款短大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/9e94cc0c-ff0e-0701-3056-5fa951fef1ff",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516357083000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 2999,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "PLAY LOUNGE",
                    "productSid": "635722131986958",
                    "originalPrice": 3999,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "365@@@PLAY LOUNGE",
                    "productscore": 0,
                    "productName": "CJ风衣款大衣",
                    "dispIdNames": [
                        "001002@@@下装"
                    ],
                    "dispIds": [
                        "001002"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/e631ab43-7410-a106-b5cb-b0cb023d3109",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "PLAY LOUNGE",
                    "createdTime": 1516357221000,
                    "unitId": 1,
                    "brandSid": 365,
                    "cuPrice": 3999,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "下装"
                    ]
                },
                {
                    "isRecommend": 0,
                    "brandName": "POLLYANNA KEONG",
                    "productSid": "676522647809791",
                    "originalPrice": 999,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "364@@@POLLYANNA KEONG",
                    "productscore": 0,
                    "productName": "D双面棒球衫",
                    "dispIdNames": [
                        "001001001@@@风衣"
                    ],
                    "dispIds": [
                        "001001001"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/6ddf2595-3328-c0fc-a701-e50cb972a20e",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "POLLYANNA KEONG",
                    "createdTime": 1516765226000,
                    "unitId": 1,
                    "brandSid": 364,
                    "cuPrice": 999,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "风衣"
                    ],
                    "productNo": "B1AA207023"
                },
                {
                    "isRecommend": 0,
                    "brandName": "POLLYANNA KEONG",
                    "productSid": "684439856231440",
                    "originalPrice": 999,
                    "attrIdNames": [
                        "1@@@颜色",
                        "2@@@尺码"
                    ],
                    "brandIdNames": "364@@@POLLYANNA KEONG",
                    "productscore": 0,
                    "productName": "D漆皮吊牌装饰风衣",
                    "dispIdNames": [
                        "001001001@@@风衣"
                    ],
                    "dispIds": [
                        "001001001"
                    ],
                    "couponIds": [],
                    "proPictDir": "https://bj.bcebos.com/v1/playlounge-obj/16eff997-4f13-419f-1c74-5fd8e471b41c",
                    "supplySid": 9,
                    "saleSum": 0,
                    "brandNameEn": "POLLYANNA KEONG",
                    "createdTime": 1516844398000,
                    "unitId": 1,
                    "brandSid": 364,
                    "cuPrice": 999,
                    "valueIdNames": [
                        "1@@@红色",
                        "2@@@白色",
                        "3@@@蓝色",
                        "4@@@黑色",
                        "5@@@绿色",
                        "6@@@XXS",
                        "7@@@XS",
                        "8@@@S",
                        "9@@@M"
                    ],
                    "attrValues": [
                        "1@@@1",
                        "1@@@2",
                        "1@@@3",
                        "1@@@4",
                        "1@@@5",
                        "2@@@6",
                        "2@@@7",
                        "2@@@8",
                        "2@@@9"
                    ],
                    "dispNames": [
                        "风衣"
                    ]
                }
            ]
        }
    }
</script>

<style lang="scss">
    $black: #000;
    .topic-brand {
        background-color: #fff;
        img {
            display: block;
            width: rem(690);
            margin-left: auto;
            margin-right: auto;
        }
        .scroll-container {
            width: 100%;
            .item-list {
                display: flex;
                padding-left: rem(30);
                .item {
                    position: relative;
                    width: rem(150);
                    margin-right: rem(50);
                    padding-top: rem(30);
                    padding-bottom: rem(30);
                    box-sizing: border-box;
                    background-color: #fff;
                    .item-logo {
                        width: rem(130);
                        height: rem(130);
                        background: center no-repeat;
                        background-size: contain;
                    }
                    .item-name {
                        padding-top: rem(30);
                        font-size: rem(26);
                        color: $black;
                        line-height: 1.5;
                        @include textOverEffect();
                    }
                    .item-price {
                        padding-top: rem(10);
                        font-size: rem(24);
                        color: $black;
                    }
                }
            }
        }
    }
</style>

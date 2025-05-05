"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedDemoData;
var core_flows_1 = require("@medusajs/core-flows");
var utils_1 = require("@medusajs/framework/utils");
function seedDemoData(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var logger, link, fulfillmentModuleService, salesChannelModuleService, storeModuleService, countries, store, defaultSalesChannel, salesChannelResult, regionResult, region, stockLocationResult, stockLocation, shippingProfileResult, shippingProfile, fulfillmentSet, publishableApiKeyResult, publishableApiKey, collection, categoryResult;
        var _c, _d;
        var _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var container = _b.container;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
                    link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
                    fulfillmentModuleService = container.resolve(utils_1.ModuleRegistrationName.FULFILLMENT);
                    salesChannelModuleService = container.resolve(utils_1.ModuleRegistrationName.SALES_CHANNEL);
                    storeModuleService = container.resolve(utils_1.ModuleRegistrationName.STORE);
                    countries = ["gb", "de", "dk", "se", "fr", "es", "it", "vn"];
                    logger.info("Seeding store data...");
                    return [4 /*yield*/, storeModuleService.listStores()];
                case 1:
                    store = (_p.sent())[0];
                    return [4 /*yield*/, salesChannelModuleService.listSalesChannels({
                            name: "Default Sales Channel",
                        })];
                case 2:
                    defaultSalesChannel = _p.sent();
                    if (!!defaultSalesChannel.length) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, core_flows_1.createSalesChannelsWorkflow)(container).run({
                            input: {
                                salesChannelsData: [
                                    {
                                        name: "Default Sales Channel",
                                    },
                                ],
                            },
                        })];
                case 3:
                    salesChannelResult = (_p.sent()).result;
                    defaultSalesChannel = salesChannelResult;
                    _p.label = 4;
                case 4: return [4 /*yield*/, (0, core_flows_1.updateStoresWorkflow)(container).run({
                        input: {
                            selector: { id: store.id },
                            update: {
                                supported_currencies: [
                                    {
                                        currency_code: "eur",
                                        is_default: true,
                                    },
                                    {
                                        currency_code: "usd",
                                    },
                                    {
                                        currency_code: "vnd",
                                    },
                                ],
                                default_sales_channel_id: defaultSalesChannel[0].id,
                            },
                        },
                    })];
                case 5:
                    _p.sent();
                    logger.info("Seeding region data...");
                    return [4 /*yield*/, (0, core_flows_1.createRegionsWorkflow)(container).run({
                            input: {
                                regions: [
                                    {
                                        name: "Europe and Asia",
                                        currency_code: "eur",
                                        countries: countries,
                                        payment_providers: ["pp_system_default"],
                                    },
                                ],
                            },
                        })];
                case 6:
                    regionResult = (_p.sent()).result;
                    region = regionResult[0];
                    logger.info("Finished seeding regions.");
                    logger.info("Seeding tax regions...");
                    return [4 /*yield*/, (0, core_flows_1.createTaxRegionsWorkflow)(container).run({
                            input: countries.map(function (country_code) { return ({
                                country_code: country_code,
                            }); }),
                        })];
                case 7:
                    _p.sent();
                    logger.info("Finished seeding tax regions.");
                    logger.info("Seeding stock location data...");
                    return [4 /*yield*/, (0, core_flows_1.createStockLocationsWorkflow)(container).run({
                            input: {
                                locations: [
                                    {
                                        name: "Global Warehouse",
                                        address: {
                                            city: "Copenhagen",
                                            country_code: "DK",
                                            address_1: "",
                                        },
                                    },
                                ],
                            },
                        })];
                case 8:
                    stockLocationResult = (_p.sent()).result;
                    stockLocation = stockLocationResult[0];
                    return [4 /*yield*/, link.create((_c = {},
                            _c[utils_1.Modules.STOCK_LOCATION] = {
                                stock_location_id: stockLocation.id,
                            },
                            _c[utils_1.Modules.FULFILLMENT] = {
                                fulfillment_provider_id: "manual_manual",
                            },
                            _c))];
                case 9:
                    _p.sent();
                    logger.info("Seeding fulfillment data...");
                    return [4 /*yield*/, (0, core_flows_1.createShippingProfilesWorkflow)(container).run({
                            input: {
                                data: [
                                    {
                                        name: "Default",
                                        type: "default",
                                    },
                                ],
                            },
                        })];
                case 10:
                    shippingProfileResult = (_p.sent()).result;
                    shippingProfile = shippingProfileResult[0];
                    return [4 /*yield*/, fulfillmentModuleService.createFulfillmentSets({
                            name: "Global Warehouse delivery",
                            type: "shipping",
                            service_zones: [
                                {
                                    name: "Europe and Asia",
                                    geo_zones: [
                                        {
                                            country_code: "gb",
                                            type: "country",
                                        },
                                        {
                                            country_code: "de",
                                            type: "country",
                                        },
                                        {
                                            country_code: "dk",
                                            type: "country",
                                        },
                                        {
                                            country_code: "se",
                                            type: "country",
                                        },
                                        {
                                            country_code: "fr",
                                            type: "country",
                                        },
                                        {
                                            country_code: "es",
                                            type: "country",
                                        },
                                        {
                                            country_code: "it",
                                            type: "country",
                                        },
                                        {
                                            country_code: "vn",
                                            type: "country",
                                        },
                                    ],
                                },
                            ],
                        })];
                case 11:
                    fulfillmentSet = _p.sent();
                    return [4 /*yield*/, link.create((_d = {},
                            _d[utils_1.Modules.STOCK_LOCATION] = {
                                stock_location_id: stockLocation.id,
                            },
                            _d[utils_1.Modules.FULFILLMENT] = {
                                fulfillment_set_id: fulfillmentSet.id,
                            },
                            _d))];
                case 12:
                    _p.sent();
                    return [4 /*yield*/, (0, core_flows_1.createShippingOptionsWorkflow)(container).run({
                            input: [
                                {
                                    name: "Standard Shipping",
                                    price_type: "flat",
                                    provider_id: "manual_manual",
                                    service_zone_id: fulfillmentSet.service_zones[0].id,
                                    shipping_profile_id: shippingProfile.id,
                                    type: {
                                        label: "Standard",
                                        description: "Ship in 2-3 days.",
                                        code: "standard",
                                    },
                                    prices: [
                                        {
                                            currency_code: "usd",
                                            amount: 10,
                                        },
                                        {
                                            currency_code: "eur",
                                            amount: 10,
                                        },
                                        {
                                            currency_code: "vnd",
                                            amount: 250000,
                                        },
                                        {
                                            region_id: region.id,
                                            amount: 10,
                                        },
                                    ],
                                    rules: [
                                        {
                                            attribute: "enabled_in_store",
                                            value: '"true"',
                                            operator: "eq",
                                        },
                                        {
                                            attribute: "is_return",
                                            value: "false",
                                            operator: "eq",
                                        },
                                    ],
                                },
                                {
                                    name: "Express Shipping",
                                    price_type: "flat",
                                    provider_id: "manual_manual",
                                    service_zone_id: fulfillmentSet.service_zones[0].id,
                                    shipping_profile_id: shippingProfile.id,
                                    type: {
                                        label: "Express",
                                        description: "Ship in 24 hours.",
                                        code: "express",
                                    },
                                    prices: [
                                        {
                                            currency_code: "usd",
                                            amount: 20,
                                        },
                                        {
                                            currency_code: "eur",
                                            amount: 20,
                                        },
                                        {
                                            currency_code: "vnd",
                                            amount: 500000,
                                        },
                                        {
                                            region_id: region.id,
                                            amount: 20,
                                        },
                                    ],
                                    rules: [
                                        {
                                            attribute: "enabled_in_store",
                                            value: '"true"',
                                            operator: "eq",
                                        },
                                        {
                                            attribute: "is_return",
                                            value: "false",
                                            operator: "eq",
                                        },
                                    ],
                                },
                            ],
                        })];
                case 13:
                    _p.sent();
                    logger.info("Finished seeding fulfillment data.");
                    return [4 /*yield*/, (0, core_flows_1.linkSalesChannelsToStockLocationWorkflow)(container).run({
                            input: {
                                id: stockLocation.id,
                                add: [defaultSalesChannel[0].id],
                            },
                        })];
                case 14:
                    _p.sent();
                    logger.info("Finished seeding stock location data.");
                    logger.info("Seeding publishable API key data...");
                    return [4 /*yield*/, (0, core_flows_1.createApiKeysWorkflow)(container).run({
                            input: {
                                api_keys: [
                                    {
                                        title: "Webshop",
                                        type: "publishable",
                                        created_by: "",
                                    },
                                ],
                            },
                        })];
                case 15:
                    publishableApiKeyResult = (_p.sent()).result;
                    publishableApiKey = publishableApiKeyResult[0];
                    return [4 /*yield*/, (0, core_flows_1.linkSalesChannelsToApiKeyWorkflow)(container).run({
                            input: {
                                id: publishableApiKey.id,
                                add: [defaultSalesChannel[0].id],
                            },
                        })];
                case 16:
                    _p.sent();
                    logger.info("Finished seeding publishable API key data.");
                    logger.info("Seeding product data...");
                    return [4 /*yield*/, (0, core_flows_1.createCollectionsWorkflow)(container).run({
                            input: {
                                collections: [
                                    {
                                        title: "Featured",
                                        handle: "featured",
                                    },
                                ],
                            },
                        })];
                case 17:
                    collection = (_p.sent()).result[0];
                    return [4 /*yield*/, (0, core_flows_1.createProductCategoriesWorkflow)(container).run({
                            input: {
                                product_categories: [
                                    {
                                        name: "Laptops",
                                        is_active: true,
                                    },
                                    {
                                        name: "Accessories",
                                        is_active: true,
                                    },
                                    {
                                        name: "Phones",
                                        is_active: true,
                                    },
                                    {
                                        name: "Monitors",
                                        is_active: true,
                                    },
                                    {
                                        name: "Desks",
                                        is_active: true,
                                    },
                                ],
                            },
                        })];
                case 18:
                    categoryResult = (_p.sent()).result;
                    return [4 /*yield*/, (0, core_flows_1.createProductsWorkflow)(container).run({
                            input: {
                                products: [
                                    {
                                        title: '16" Ultra-Slim AI Laptop | 3K OLED | 1.1cm Thin | 6-Speaker Audio',
                                        collection_id: collection.id,
                                        category_ids: [
                                            (_e = categoryResult.find(function (cat) { return cat.name === "Laptops"; })) === null || _e === void 0 ? void 0 : _e.id,
                                        ],
                                        description: "This ultra-thin 16-inch laptop is a sophisticated, high-performance machine for the new era of artificial intelligence. It has been completely redesigned from the inside out. The cabinet features an exquisite new ceramic-aluminum composite material in a range of nature-inspired colors. This material provides durability while completing the ultra-slim design and resisting the test of time. This innovative computer utilizes the latest AI-enhanced processor with quiet ambient cooling. It's designed to enrich your lifestyle on the go with an astonishingly thin 1.1cm chassis that houses an advanced 16-inch 3K OLED display and immersive six-speaker audio.",
                                        weight: 400,
                                        status: utils_1.ProductStatus.PUBLISHED,
                                        images: [
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/laptop-front.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/laptop-side.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/laptop-top.png",
                                            },
                                        ],
                                        options: [
                                            {
                                                title: "Storage",
                                                values: ["256 GB", "512 GB"],
                                            },
                                            {
                                                title: "Color",
                                                values: ["Blue", "Red"],
                                            },
                                        ],
                                        variants: [
                                            {
                                                title: "256 GB / Blue",
                                                sku: "256-BLUE",
                                                options: {
                                                    Storage: "256 GB",
                                                    Color: "Blue",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 1299,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 1299,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 32000000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                            {
                                                title: "512 GB / Red",
                                                sku: "512-RED",
                                                options: {
                                                    Storage: "512 GB",
                                                    Color: "Red",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 1259,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 1259,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 31000000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                        ],
                                        sales_channels: [
                                            {
                                                id: defaultSalesChannel[0].id,
                                            },
                                        ],
                                    },
                                ],
                            },
                        })];
                case 19:
                    _p.sent();
                    return [4 /*yield*/, (0, core_flows_1.createProductsWorkflow)(container).run({
                            input: {
                                products: [
                                    {
                                        title: "1080p HD Pro Webcam | Superior Video | Privacy enabled",
                                        category_ids: [
                                            (_f = categoryResult.find(function (cat) { return cat.name === "Accessories"; })) === null || _f === void 0 ? void 0 : _f.id,
                                        ],
                                        description: "High-quality 1080p HD webcam that elevates your work environment with superior video and audio that outperforms standard laptop cameras. Achieve top-tier video collaboration at a cost-effective price point, ideal for widespread deployment across your organization.",
                                        weight: 400,
                                        status: utils_1.ProductStatus.PUBLISHED,
                                        images: [
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/camera-front.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/camera-side.png",
                                            },
                                        ],
                                        options: [
                                            {
                                                title: "Color",
                                                values: ["Black", "White"],
                                            },
                                        ],
                                        variants: [
                                            {
                                                title: "Webcam Black",
                                                sku: "WEBCAM-BLACK",
                                                options: {
                                                    Color: "Black",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 59,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 59,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 1450000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                            {
                                                title: "Webcam White",
                                                sku: "WEBCAM-WHITE",
                                                options: {
                                                    Color: "White",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 65,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 65,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 1600000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                        ],
                                        sales_channels: [
                                            {
                                                id: defaultSalesChannel[0].id,
                                            },
                                        ],
                                    },
                                ],
                            },
                        })];
                case 20:
                    _p.sent();
                    return [4 /*yield*/, (0, core_flows_1.createProductsWorkflow)(container).run({
                            input: {
                                products: [
                                    {
                                        title: "6.5\" Ultra HD Smartphone | 3x Impact-Resistant Screen",
                                        collection_id: collection.id,
                                        category_ids: [
                                            (_g = categoryResult.find(function (cat) { return cat.name === "Phones"; })) === null || _g === void 0 ? void 0 : _g.id,
                                        ],
                                        description: 'This premium smartphone is crafted from durable and lightweight aerospace-grade aluminum, featuring an expansive 6.5" Ultra-High Definition AMOLED display. It boasts exceptional durability with a cutting-edge nanocrystal glass front, offering three times the impact resistance of standard smartphone screens. The device combines sleek design with robust protection, setting a new standard for smartphone resilience and visual excellence.',
                                        weight: 400,
                                        status: utils_1.ProductStatus.PUBLISHED,
                                        images: [
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/phone-front.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/phone-side.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/phone-bottom.png",
                                            },
                                        ],
                                        options: [
                                            {
                                                title: "Memory",
                                                values: ["256 GB", "512 GB"],
                                            },
                                            {
                                                title: "Color",
                                                values: ["Purple", "Red"],
                                            },
                                        ],
                                        variants: [
                                            {
                                                title: "256 GB Purple",
                                                sku: "PHONE-256-PURPLE",
                                                options: {
                                                    Memory: "256 GB",
                                                    Color: "Purple",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 999,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 999,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 24600000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                            {
                                                title: "256 GB Red",
                                                sku: "256-RED",
                                                options: {
                                                    Memory: "256 GB",
                                                    Color: "Red",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 959,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 959,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 23600000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                        ],
                                        sales_channels: [
                                            {
                                                id: defaultSalesChannel[0].id,
                                            },
                                        ],
                                    },
                                ],
                            },
                        })];
                case 21:
                    _p.sent();
                    return [4 /*yield*/, (0, core_flows_1.createProductsWorkflow)(container).run({
                            input: {
                                products: [
                                    {
                                        title: "34\" QD-OLED Curved Gaming Monitor | Ultra-Wide | Infinite Contrast | 175Hz",
                                        collection_id: collection.id,
                                        category_ids: [
                                            (_h = categoryResult.find(function (cat) { return cat.name === "Monitors"; })) === null || _h === void 0 ? void 0 : _h.id,
                                        ],
                                        description: "Experience the pinnacle of display technology with this 34-inch curved monitor. By merging OLED panels and Quantum Dot technology, this QD-OLED screen delivers exceptional contrast, deep blacks, unlimited viewing angles, and vivid colors. The curved design provides an immersive experience, allowing you to enjoy the best of both worlds in one cutting-edge display. This innovative monitor represents the ultimate fusion of visual performance and immersive design.",
                                        weight: 400,
                                        status: utils_1.ProductStatus.PUBLISHED,
                                        images: [
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/screen-front.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/screen-side.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/screen-top.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/screen-back.png",
                                            },
                                        ],
                                        options: [
                                            {
                                                title: "Color",
                                                values: ["White", "Black"],
                                            },
                                        ],
                                        variants: [
                                            {
                                                title: "ACME Monitor 4k White",
                                                sku: "ACME-MONITOR-WHITE",
                                                options: {
                                                    Color: "White",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 599,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 599,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 14750000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                            {
                                                title: "ACME Monitor 4k Black",
                                                sku: "ACME-MONITOR-BLACK",
                                                options: {
                                                    Color: "Black",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 599,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 599,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 14750000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                        ],
                                        sales_channels: [
                                            {
                                                id: defaultSalesChannel[0].id,
                                            },
                                        ],
                                    },
                                ],
                            },
                        })];
                case 22:
                    _p.sent();
                    return [4 /*yield*/, (0, core_flows_1.createProductsWorkflow)(container).run({
                            input: {
                                products: [
                                    {
                                        title: "Hi-Fi Gaming Headset | Pro-Grade DAC | Hi-Res Certified",
                                        collection_id: collection.id,
                                        category_ids: [
                                            (_j = categoryResult.find(function (cat) { return cat.name === "Accessories"; })) === null || _j === void 0 ? void 0 : _j.id,
                                        ],
                                        description: "Experience studio-quality audio with this advanced acoustic system, which pairs premium hardware with high-fidelity sound and innovative audio software for an immersive listening experience. The integrated digital-to-analog converter (DAC) enhances the audio setup with high-resolution certification and a built-in amplifier, delivering exceptional sound clarity and depth. This comprehensive audio solution brings professional-grade sound to your personal environment, whether for gaming, music production, or general entertainment.",
                                        weight: 400,
                                        status: utils_1.ProductStatus.PUBLISHED,
                                        images: [
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/headphone-front.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/headphone-side.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/headphone-top.png",
                                            },
                                        ],
                                        options: [
                                            {
                                                title: "Color",
                                                values: ["Black", "White"],
                                            },
                                        ],
                                        variants: [
                                            {
                                                title: "Headphone Black",
                                                sku: "HEADPHONE-BLACK",
                                                options: {
                                                    Color: "Black",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 149,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 149,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 3670000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                            {
                                                title: "Headphone White",
                                                sku: "HEADPHONE-WHITE",
                                                options: {
                                                    Color: "White",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 149,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 149,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 3670000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                        ],
                                        sales_channels: [
                                            {
                                                id: defaultSalesChannel[0].id,
                                            },
                                        ],
                                    },
                                ],
                            },
                        })];
                case 23:
                    _p.sent();
                    return [4 /*yield*/, (0, core_flows_1.createProductsWorkflow)(container).run({
                            input: {
                                products: [
                                    {
                                        title: "Wireless Keyboard | Touch ID | Numeric Keypad",
                                        category_ids: [
                                            (_k = categoryResult.find(function (cat) { return cat.name === "Accessories"; })) === null || _k === void 0 ? void 0 : _k.id,
                                        ],
                                        description: "This wireless keyboard offers a comfortable typing experience with a numeric keypad and Touch ID. It features navigation buttons, full-sized arrow keys, and is ideal for spreadsheets and gaming. The rechargeable battery lasts about a month. It pairs automatically with compatible computers and includes a USB-C to Lightning cable for charging and pairing.",
                                        weight: 400,
                                        status: utils_1.ProductStatus.PUBLISHED,
                                        images: [
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/keyboard-front.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/keyboard-side.png",
                                            },
                                        ],
                                        options: [
                                            {
                                                title: "Color",
                                                values: ["Black", "White"],
                                            },
                                        ],
                                        variants: [
                                            {
                                                title: "Keyboard Black",
                                                sku: "KEYBOARD-BLACK",
                                                options: {
                                                    Color: "Black",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 99,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 99,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 2440000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                            {
                                                title: "Keyboard White",
                                                sku: "KEYBOARD-WHITE",
                                                options: {
                                                    Color: "White",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 99,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 99,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 2440000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                        ],
                                        sales_channels: [
                                            {
                                                id: defaultSalesChannel[0].id,
                                            },
                                        ],
                                    },
                                ],
                            },
                        })];
                case 24:
                    _p.sent();
                    return [4 /*yield*/, (0, core_flows_1.createProductsWorkflow)(container).run({
                            input: {
                                products: [
                                    {
                                        title: "Wireless Rechargeable Mouse | Multi-Touch Surface",
                                        category_ids: [
                                            (_l = categoryResult.find(function (cat) { return cat.name === "Accessories"; })) === null || _l === void 0 ? void 0 : _l.id,
                                        ],
                                        description: "This wireless mouse offers a smooth navigation experience with a multi-touch surface. It features a rechargeable battery that lasts up to a month and pairs automatically with compatible devices. Includes a USB-C charging cable for convenience.",
                                        weight: 400,
                                        status: utils_1.ProductStatus.PUBLISHED,
                                        images: [
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/mouse-top.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/mouse-front.png",
                                            },
                                        ],
                                        options: [
                                            {
                                                title: "Color",
                                                values: ["Black", "White"],
                                            },
                                        ],
                                        variants: [
                                            {
                                                title: "Mouse Black",
                                                sku: "MOUSE-BLACK",
                                                options: {
                                                    Color: "Black",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 79,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 79,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 1950000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                            {
                                                title: "Mouse White",
                                                sku: "MOUSE-WHITE",
                                                options: {
                                                    Color: "White",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 79,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 79,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 1950000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                        ],
                                        sales_channels: [
                                            {
                                                id: defaultSalesChannel[0].id,
                                            },
                                        ],
                                    },
                                ],
                            },
                        })];
                case 25:
                    _p.sent();
                    return [4 /*yield*/, (0, core_flows_1.createProductsWorkflow)(container).run({
                            input: {
                                products: [
                                    {
                                        title: "Conference Speaker | High-Performance | Budget-Friendly",
                                        category_ids: [
                                            (_m = categoryResult.find(function (cat) { return cat.name === "Accessories"; })) === null || _m === void 0 ? void 0 : _m.id,
                                        ],
                                        description: "This compact, powerful conference speaker offers exceptional, high-performance features at a surprisingly affordable price. Packed with advanced productivity-enhancing technology, it delivers premium functionality without the premium price tag. Experience better meetings and improved communication, regardless of where your team members are calling from.",
                                        weight: 400,
                                        status: utils_1.ProductStatus.PUBLISHED,
                                        images: [
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/speaker-top.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/speaker-front.png",
                                            },
                                        ],
                                        options: [
                                            {
                                                title: "Color",
                                                values: ["Black", "White"],
                                            },
                                        ],
                                        variants: [
                                            {
                                                title: "Speaker Black",
                                                sku: "SPEAKER-BLACK",
                                                options: {
                                                    Color: "Black",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 79,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 79,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 1950000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                            {
                                                title: "Speaker White",
                                                sku: "SPEAKER-WHITE",
                                                options: {
                                                    Color: "White",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 55,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 55,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 1350000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                        ],
                                        sales_channels: [
                                            {
                                                id: defaultSalesChannel[0].id,
                                            },
                                        ],
                                    },
                                ],
                            },
                        })];
                case 26:
                    _p.sent();
                    return [4 /*yield*/, (0, core_flows_1.createProductsWorkflow)(container).run({
                            input: {
                                products: [
                                    {
                                        title: "15.6\" Gaming Laptop | RTX 4080 | 240Hz QHD Display",
                                        collection_id: collection.id,
                                        category_ids: [
                                            (_o = categoryResult.find(function (cat) { return cat.name === "Laptops"; })) === null || _o === void 0 ? void 0 : _o.id,
                                        ],
                                        description: "Unleash your gaming potential with this 15.6-inch gaming laptop. Powered by an NVIDIA RTX 4080 GPU and a 240Hz QHD display, it delivers stunning visuals and smooth performance. Equipped with advanced cooling technology and RGB backlit keyboard, this laptop is designed for immersive gaming experiences.",
                                        weight: 450,
                                        status: utils_1.ProductStatus.PUBLISHED,
                                        images: [
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/gaming-laptop-front.png",
                                            },
                                            {
                                                url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/gaming-laptop-side.png",
                                            },
                                        ],
                                        options: [
                                            {
                                                title: "Storage",
                                                values: ["512 GB", "1 TB"],
                                            },
                                            {
                                                title: "Color",
                                                values: ["Black", "Silver"],
                                            },
                                        ],
                                        variants: [
                                            {
                                                title: "512 GB / Black",
                                                sku: "GAMING-LAPTOP-512-BLACK",
                                                options: {
                                                    Storage: "512 GB",
                                                    Color: "Black",
                                                },
                                                manage_inventory: false,
                                                prices: [
                                                    {
                                                        amount: 1999,
                                                        currency_code: "eur",
                                                    },
                                                    {
                                                        amount: 1999,
                                                        currency_code: "usd",
                                                    },
                                                    {
                                                        amount: 49200000,
                                                        currency_code: "vnd",
                                                    },
                                                ],
                                            },
                                            {
                                                title: "1 TB / Silver",
                                                sku: "GAMING-LAPTOP-1TB-SILVER",
                                                options: {
                                                    Storage: Storage
                                                }(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])))(templateObject_2 || (templateObject_2 = __makeTemplateObject(["typescript\n: \"1 TB\",\n                Color: \"Silver\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 2199,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 2199,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 54100000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n          ],\n          sales_channels: [\n            {\n              id: defaultSalesChannel[0].id,\n            },\n          ],\n        },\n      ],\n    },\n  });\n\n  await createProductsWorkflow(container).run({\n    input: {\n      products: [\n        {\n          title: \"Smartwatch | AMOLED Display | Heart Rate Monitor\",\n          category_ids: [\n            categoryResult.find((cat) => cat.name === \"Accessories\")?.id!,\n          ],\n          description:\n            \"Stay connected and track your fitness with this sleek smartwatch. Featuring a vibrant AMOLED display, heart rate monitoring, and up to 7 days of battery life, it\u2019s perfect for both work and workouts. Supports notifications, music control, and water resistance.\",\n          weight: 200,\n          status: ProductStatus.PUBLISHED,\n          images: [\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/smartwatch-front.png\",\n            },\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/smartwatch-side.png\",\n            },\n          ],\n          options: [\n            {\n              title: \"Color\",\n              values: [\"Black\", \"Silver\"],\n            },\n          ],\n          variants: [\n            {\n              title: \"Smartwatch Black\",\n              sku: \"SMARTWATCH-BLACK\",\n              options: {\n                Color: \"Black\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 199,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 199,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 4900000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n            {\n              title: \"Smartwatch Silver\",\n              sku: \"SMARTWATCH-SILVER\",\n              options: {\n                Color: \"Silver\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 199,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 199,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 4900000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n          ],\n          sales_channels: [\n            {\n              id: defaultSalesChannel[0].id,\n            },\n          ],\n        },\n      ],\n    },\n  });\n\n  await createProductsWorkflow(container).run({\n    input: {\n      products: [\n        {\n          title: \"Ergonomic Adjustable Desk | Electric Standing Desk\",\n          category_ids: [\n            categoryResult.find((cat) => cat.name === \"Desks\")?.id!,\n          ],\n          description:\n            \"Enhance your workspace with this electric standing desk. Featuring smooth height adjustment, a spacious work surface, and cable management, it\u2019s designed for comfort and productivity. Perfect for home offices or gaming setups.\",\n          weight: 20000,\n          status: ProductStatus.PUBLISHED,\n          images: [\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/desk-front.png\",\n            },\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/desk-side.png\",\n            },\n          ],\n          options: [\n            {\n              title: \"Color\",\n              values: [\"Black\", \"White\"],\n            },\n          ],\n          variants: [\n            {\n              title: \"Desk Black\",\n              sku: \"DESK-BLACK\",\n              options: {\n                Color: \"Black\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 499,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 499,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 12300000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n            {\n              title: \"Desk White\",\n              sku: \"DESK-WHITE\",\n              options: {\n                Color: \"White\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 499,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 499,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 12300000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n          ],\n          sales_channels: [\n            {\n              id: defaultSalesChannel[0].id,\n            },\n          ],\n        },\n      ],\n    },\n  });\n\n  await createProductsWorkflow(container).run({\n    input: {\n      products: [\n        {\n          title: \"USB-C Docking Station | 12-in-1 Connectivity\",\n          category_ids: [\n            categoryResult.find((cat) => cat.name === \"Accessories\")?.id!,\n          ],\n          description:\n            \"Expand your laptop\u2019s connectivity with this 12-in-1 USB-C docking station. Supports dual 4K monitors, USB 3.0, Ethernet, SD card reader, and 100W power delivery. Compact and versatile, it\u2019s ideal for professionals and creatives.\",\n          weight: 300,\n          status: ProductStatus.PUBLISHED,\n          images: [\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/docking-station-front.png\",\n            },\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/docking-station-side.png\",\n            },\n          ],\n          options: [\n            {\n              title: \"Color\",\n              values: [\"Silver\", \"Black\"],\n            },\n          ],\n          variants: [\n            {\n              title: \"Docking Station Silver\",\n              sku: \"DOCKING-SILVER\",\n              options: {\n                Color: \"Silver\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 129,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 129,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 3170000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n            {\n              title: \"Docking Station Black\",\n              sku: \"DOCKING-BLACK\",\n              options: {\n                Color: \"Black\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 129,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 129,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 3170000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n          ],\n          sales_channels: [\n            {\n              id: defaultSalesChannel[0].id,\n            },\n          ],\n        },\n      ],\n    },\n  });\n\n  logger.info(\"Finished seeding product data.\");\n}"], ["typescript\n: \"1 TB\",\n                Color: \"Silver\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 2199,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 2199,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 54100000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n          ],\n          sales_channels: [\n            {\n              id: defaultSalesChannel[0].id,\n            },\n          ],\n        },\n      ],\n    },\n  });\n\n  await createProductsWorkflow(container).run({\n    input: {\n      products: [\n        {\n          title: \"Smartwatch | AMOLED Display | Heart Rate Monitor\",\n          category_ids: [\n            categoryResult.find((cat) => cat.name === \"Accessories\")?.id!,\n          ],\n          description:\n            \"Stay connected and track your fitness with this sleek smartwatch. Featuring a vibrant AMOLED display, heart rate monitoring, and up to 7 days of battery life, it\u2019s perfect for both work and workouts. Supports notifications, music control, and water resistance.\",\n          weight: 200,\n          status: ProductStatus.PUBLISHED,\n          images: [\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/smartwatch-front.png\",\n            },\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/smartwatch-side.png\",\n            },\n          ],\n          options: [\n            {\n              title: \"Color\",\n              values: [\"Black\", \"Silver\"],\n            },\n          ],\n          variants: [\n            {\n              title: \"Smartwatch Black\",\n              sku: \"SMARTWATCH-BLACK\",\n              options: {\n                Color: \"Black\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 199,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 199,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 4900000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n            {\n              title: \"Smartwatch Silver\",\n              sku: \"SMARTWATCH-SILVER\",\n              options: {\n                Color: \"Silver\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 199,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 199,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 4900000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n          ],\n          sales_channels: [\n            {\n              id: defaultSalesChannel[0].id,\n            },\n          ],\n        },\n      ],\n    },\n  });\n\n  await createProductsWorkflow(container).run({\n    input: {\n      products: [\n        {\n          title: \"Ergonomic Adjustable Desk | Electric Standing Desk\",\n          category_ids: [\n            categoryResult.find((cat) => cat.name === \"Desks\")?.id!,\n          ],\n          description:\n            \"Enhance your workspace with this electric standing desk. Featuring smooth height adjustment, a spacious work surface, and cable management, it\u2019s designed for comfort and productivity. Perfect for home offices or gaming setups.\",\n          weight: 20000,\n          status: ProductStatus.PUBLISHED,\n          images: [\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/desk-front.png\",\n            },\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/desk-side.png\",\n            },\n          ],\n          options: [\n            {\n              title: \"Color\",\n              values: [\"Black\", \"White\"],\n            },\n          ],\n          variants: [\n            {\n              title: \"Desk Black\",\n              sku: \"DESK-BLACK\",\n              options: {\n                Color: \"Black\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 499,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 499,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 12300000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n            {\n              title: \"Desk White\",\n              sku: \"DESK-WHITE\",\n              options: {\n                Color: \"White\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 499,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 499,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 12300000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n          ],\n          sales_channels: [\n            {\n              id: defaultSalesChannel[0].id,\n            },\n          ],\n        },\n      ],\n    },\n  });\n\n  await createProductsWorkflow(container).run({\n    input: {\n      products: [\n        {\n          title: \"USB-C Docking Station | 12-in-1 Connectivity\",\n          category_ids: [\n            categoryResult.find((cat) => cat.name === \"Accessories\")?.id!,\n          ],\n          description:\n            \"Expand your laptop\u2019s connectivity with this 12-in-1 USB-C docking station. Supports dual 4K monitors, USB 3.0, Ethernet, SD card reader, and 100W power delivery. Compact and versatile, it\u2019s ideal for professionals and creatives.\",\n          weight: 300,\n          status: ProductStatus.PUBLISHED,\n          images: [\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/docking-station-front.png\",\n            },\n            {\n              url: \"https://medusa-public-images.s3.eu-west-1.amazonaws.com/docking-station-side.png\",\n            },\n          ],\n          options: [\n            {\n              title: \"Color\",\n              values: [\"Silver\", \"Black\"],\n            },\n          ],\n          variants: [\n            {\n              title: \"Docking Station Silver\",\n              sku: \"DOCKING-SILVER\",\n              options: {\n                Color: \"Silver\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 129,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 129,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 3170000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n            {\n              title: \"Docking Station Black\",\n              sku: \"DOCKING-BLACK\",\n              options: {\n                Color: \"Black\",\n              },\n              manage_inventory: false,\n              prices: [\n                {\n                  amount: 129,\n                  currency_code: \"eur\",\n                },\n                {\n                  amount: 129,\n                  currency_code: \"usd\",\n                },\n                {\n                  amount: 3170000,\n                  currency_code: \"vnd\",\n                },\n              ],\n            },\n          ],\n          sales_channels: [\n            {\n              id: defaultSalesChannel[0].id,\n            },\n          ],\n        },\n      ],\n    },\n  });\n\n  logger.info(\"Finished seeding product data.\");\n}"])))
                                            }
                                        ]
                                    }
                                ]
                            }
                        })];
                case 27:
                    _p.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var templateObject_1, templateObject_2;

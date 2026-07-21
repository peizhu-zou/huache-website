export type ProductRecord = {
  id: string;
  code: string;
  slug: string;
  title: string;
  nameEn: string;
  summary: string;
  voltage?: string;
  power?: string;
  cooling?: string;
  protection?: string;
  applications: readonly string[];
  featured?: boolean;
  maturity: "量产" | "样机" | "测试";
};

export type ProductGroup = {
  id: string;
  label: string;
  description: string;
  products: readonly ProductRecord[];
};

export type ProductFamily = {
  id: string;
  label: string;
  nameEn: string;
  summary: string;
  groups: readonly ProductGroup[];
};

export const productFamilies: readonly ProductFamily[] = [
  {
    id: "motors",
    label: "电机",
    nameEn: "Motors",
    summary: "面向特种车辆、无人平台和辅助动力系统，提供驱动与起发一体电机产品。",
    groups: [
      {
        id: "traction-motors",
        label: "驱动电机",
        description: "用于车辆牵引、履带驱动和任务机构的动力输出。",
        products: [
          {
            id: "MOTOR-001",
            code: "HCSD-M-D-330V-W",
            slug: "traction-motor-30kw",
            title: "30kW 驱动电机",
            nameEn: "30kW Traction Motor",
            summary: "永磁驱动电机，用于履带车辆及特种移动平台电驱系统。",
            voltage: "330VDC",
            power: "16 / 30kW",
            cooling: "水冷",
            applications: ["履带车辆", "特种移动平台"],
            maturity: "量产",
          },
        ],
      },
      {
        id: "isg-motors",
        label: "起发一体电机",
        description: "在同一电机单元中实现发动机起动与发电功能。",
        products: [
          {
            id: "MOTOR-002",
            code: "HCSD-M-ISG-270V-W",
            slug: "integrated-starter-generator",
            title: "起动发电一体电机",
            nameEn: "Integrated Starter Generator",
            summary: "集成起动和发电两种功能，用于增程与辅助动力系统。",
            voltage: "270VDC",
            power: "30 / 45kW",
            cooling: "水冷",
            applications: ["辅助动力系统", "增程发电系统"],
            maturity: "量产",
          },
        ],
      },
    ],
  },
  {
    id: "motor-controllers",
    label: "电机控制器",
    nameEn: "Motor Controllers",
    summary: "覆盖牵引电机、双电机、液压油泵与起发一体机的驱动和控制。",
    groups: [
      {
        id: "traction-control",
        label: "驱动电机控制器",
        description: "面向牵引、转向和辅助机构的电机驱动控制。",
        products: [
          {
            id: "CTRL-001",
            code: "HCSD-C-D-330V-W",
            slug: "dual-motor-controller",
            title: "一拖二电机控制器",
            nameEn: "Dual Motor Controller",
            summary: "一台控制器可同时驱动两台电机，适用于履带车辆电驱系统。",
            voltage: "330VDC",
            power: "60 / 90kW",
            cooling: "水冷",
            protection: "IP67",
            applications: ["1–2.5 吨履带车辆", "双电机驱动平台"],
            featured: true,
            maturity: "量产",
          },
          {
            id: "CTRL-004",
            code: "HCSD-C-D-900V-N",
            slug: "hydraulic-pump-controller",
            title: "油泵电机控制器",
            nameEn: "Hydraulic Pump Motor Controller",
            summary: "面向运输类特种车辆吊舱液压油泵控制。",
            voltage: "900V 驱动",
            cooling: "自然冷却",
            protection: "IP65",
            applications: ["特种车辆", "液压作业机构"],
            maturity: "量产",
          },
        ],
      },
      {
        id: "isg-control",
        label: "起发一体机控制器",
        description: "实现起动、发电、整流调压和低压电源转换。",
        products: [
          {
            id: "CTRL-002",
            code: "HCSD-C-F-270V/28V-W",
            slug: "isg-controller",
            title: "起动发电一体机控制器（含 DCDC）",
            nameEn: "Integrated Starter Generator Controller",
            summary: "集成起动发电控制与 DCDC 转换，可输出 270V 与 28V 双电压。",
            voltage: "270VDC / 28VDC",
            power: "100kW / 10kW",
            cooling: "水冷",
            protection: "IP67",
            applications: ["辅助动力系统", "增程发电系统"],
            featured: true,
            maturity: "量产",
          },
        ],
      },
    ],
  },
  {
    id: "range-extenders",
    label: "增程器",
    nameEn: "Range Extenders",
    summary: "集成发动机、发电机及控制系统，为装备提供稳定的增程发电能力。",
    groups: [
      {
        id: "generator-sets",
        label: "发动机—发电机组",
        description: "覆盖不同功率等级的柴油增程发电单元。",
        products: [
          {
            id: "IPU-001",
            code: "HCSD-IPU-12kW-W",
            slug: "ipu-12kw",
            title: "12kW 发动机—发电机组",
            nameEn: "12kW Engine Generator Set",
            summary: "柴油发动机与发电机集成的紧凑型辅助动力单元。",
            voltage: "330VDC",
            power: "12 / 15kW",
            cooling: "水冷",
            protection: "IP67",
            applications: ["辅助动力系统", "小型特种平台"],
            maturity: "量产",
          },
          {
            id: "IPU-002",
            code: "HCSD-IPU-30kW-W",
            slug: "ipu-30kw",
            title: "30kW 发动机—发电机组",
            nameEn: "30kW Engine Generator Set",
            summary: "面向中功率装备的柴油增程发电单元。",
            voltage: "330VDC",
            power: "30 / 36kW",
            cooling: "水冷",
            protection: "IP67",
            applications: ["工程装备", "特种车辆"],
            maturity: "量产",
          },
          {
            id: "IPU-003",
            code: "HCSD-IPU-60kW-W",
            slug: "ipu-60kw",
            title: "60kW 发动机—发电机组",
            nameEn: "60kW Engine Generator Set",
            summary: "用于履带车辆和高功率任务装备的柴油增程发电单元。",
            voltage: "330V / 550VDC",
            power: "60 / 65kW",
            cooling: "水冷",
            protection: "IP67",
            applications: ["履带车辆", "高功率辅助动力"],
            featured: true,
            maturity: "量产",
          },
        ],
      },
      {
        id: "range-control",
        label: "增程发电控制",
        description: "围绕机组启停、功率调节、母线控制和能量协同开展系统开发。",
        products: [],
      },
    ],
  },
  {
    id: "power-systems",
    label: "电源系统",
    nameEn: "Power Conversion",
    summary: "围绕直流、交流之间的能量转换与调节，构建模块化电源产品体系。",
    groups: [
      {
        id: "dcdc",
        label: "DCDC",
        description: "完成直流电压等级转换、稳压和隔离。",
        products: [],
      },
      {
        id: "dcac",
        label: "DCAC",
        description: "将直流电能转换为受控交流输出。",
        products: [],
      },
      {
        id: "acdc",
        label: "ACDC",
        description: "将交流输入整流并转换为稳定直流输出。",
        products: [],
      },
    ],
  },
  {
    id: "power-distribution",
    label: "配电系统",
    nameEn: "Power Distribution",
    summary: "面向汽车和飞行器开展高低压配电、回路保护与状态管理。",
    groups: [
      {
        id: "vehicle-pdu",
        label: "汽车配电",
        description: "面向特种车辆的高低压回路分配、保护和状态采集。",
        products: [
          {
            id: "PDU-001",
            code: "HCSD-PDU-600V/24V-W",
            slug: "vehicle-pdu-600v-24v",
            title: "600V / 24V 车载 PDU",
            nameEn: "Vehicle Power Distribution Unit",
            summary: "实现特种车辆高压配电、低压供电、状态采集与故障保护。",
            voltage: "600V / 24V",
            power: "70kW",
            cooling: "水冷",
            protection: "IP67",
            applications: ["特种车辆", "消防与应急装备"],
            featured: true,
            maturity: "量产",
          },
        ],
      },
      {
        id: "aircraft-pdu",
        label: "飞行器配电",
        description: "面向无人机和低空装备的轻量化配电、保护与负载管理。",
        products: [],
      },
    ],
  },
  {
    id: "intelligent-chassis",
    label: "智能底盘",
    nameEn: "Intelligent Chassis",
    summary: "将整车控制、底盘域控制、驱动与任务接口集成为智能移动平台。",
    groups: [
      {
        id: "vehicle-control",
        label: "整车与域控制",
        description: "负责车辆状态、运行逻辑、动力协调与多个控制模块的统一管理。",
        products: [
          {
            id: "CTRL-005",
            code: "HCSD-VCU-12V/24V-N",
            slug: "vehicle-control-unit",
            title: "整车控制器 VCU",
            nameEn: "Vehicle Control Unit",
            summary: "整车核心控制器，负责车辆状态管理、逻辑控制与通信协调。",
            voltage: "12V / 24V",
            cooling: "自然冷却",
            protection: "IP67",
            applications: ["特种车辆", "新能源移动平台"],
            featured: true,
            maturity: "量产",
          },
          {
            id: "CTRL-003",
            code: "HCSD-YKZQ-28V-N",
            slug: "domain-controller",
            title: "域控制器",
            nameEn: "Domain Controller",
            summary: "面向车身域和底盘域，实现多个控制模块统一管理与逻辑控制。",
            voltage: "18–36V",
            cooling: "自然冷却",
            protection: "IP65",
            applications: ["特种车辆", "智能底盘"],
            featured: true,
            maturity: "量产",
          },
        ],
      },
      {
        id: "tracked-chassis",
        label: "履带式智能底盘",
        description: "面向复杂地形任务的模块化履带移动平台。",
        products: [],
      },
      {
        id: "wheeled-chassis",
        label: "轮式智能底盘",
        description: "面向巡检、运输与试验任务的轮式线控移动平台。",
        products: [],
      },
    ],
  },
] as const;

export const allProducts = productFamilies.flatMap((family) =>
  family.groups.flatMap((group) =>
    group.products.map((product) => ({
      ...product,
      familyId: family.id,
      familyLabel: family.label,
      groupId: group.id,
      groupLabel: group.label,
    })),
  ),
);

export function getProductFamily(familyId: string) {
  return productFamilies.find((family) => family.id === familyId);
}

export function getProduct(familyId: string, slug: string) {
  return allProducts.find((product) => product.familyId === familyId && product.slug === slug);
}

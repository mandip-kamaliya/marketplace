import { sequelize } from '../../config/database';
import { User, UserRole } from '../../models/User';
import { Product } from '../../models/Product';
import { Store, StoreType } from '../../models/Store';
import { Order } from '../../models/Order';
import { OrderItem } from '../../models/OrderItem';
import { StoreVisit } from '../../models/StoreVisit';
import { Model, ModelStatic } from 'sequelize';
import bcrypt from 'bcryptjs';

// Define enums locally to avoid conflicts with model imports
enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned'
}

enum OrderItemStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

enum VisitStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Helper type for model creation
type ModelType = {
  create(values: any, options?: any): Promise<Model>;
};

export async function seedDatabase() {
  const t = await sequelize.transaction();
  
  try {
    // Get models from sequelize with proper typing
    const UserModel = sequelize.models.User as ModelType;
    const ProductModel = sequelize.models.Product as ModelType;
    const StoreModel = sequelize.models.Store as ModelType;
    const OrderModel = sequelize.models.Order as ModelType;
    const OrderItemModel = sequelize.models.OrderItem as ModelType;
    const StoreVisitModel = sequelize.models.StoreVisit as ModelType;
    
    // Helper function to create models with transaction
    const createModel = async (model: ModelType, values: any): Promise<Model> => {
      return await model.create(values, { transaction: t });
    };
    
    // Helper to get ID from model instance
    const getId = (instance: Model): number => (instance as any).id;
    
    // Create admin user
    const admin = await createModel(UserModel, {
      email: 'admin@marketplace.com',
      passwordHash: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
      role: UserRole.ADMIN,
    });

    // Create sellers
    const seller1 = await createModel(UserModel, {
      email: 'seller1@marketplace.com',
      passwordHash: await bcrypt.hash('seller123', 10),
      name: 'Tech Gadgets Inc.',
      role: UserRole.SELLER,
      phone: '+1234567890',
      businessName: 'Tech Gadgets Inc.',
      taxId: 'TAX123456',
    });

    const seller2 = await createModel(UserModel, {
      email: 'seller2@marketplace.com',
      passwordHash: await bcrypt.hash('seller123', 10),
      name: 'Fashion Trends',
      role: UserRole.SELLER,
      phone: '+1987654321',
      businessName: 'Fashion Trends LLC',
      taxId: 'TAX789012',
    });

    // Create delivery person
    const deliveryPerson = await createModel(UserModel, {
      email: 'delivery@marketplace.com',
      passwordHash: await bcrypt.hash('delivery123', 10),
      name: 'John Delivery',
      role: UserRole.DELIVERY,
      phone: '+1122334455',
      vehicleNumber: 'DL-1234',
      licenseNumber: 'DL123456789',
    });

    // Create salesman
    const salesman = await createModel(UserModel, {
      email: 'salesman@marketplace.com',
      passwordHash: await bcrypt.hash('salesman123', 10),
      name: 'Mike Sales',
      role: UserRole.SALESMAN,
      phone: '+1555666777',
      employeeId: 'EMP-001',
    });

    // Create customers
    const customer1 = await createModel(UserModel, {
      email: 'customer1@example.com',
      passwordHash: await bcrypt.hash('customer123', 10),
      name: 'Alice Johnson',
      role: UserRole.CUSTOMER,
      phone: '+1999888777',
      address: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      country: 'USA',
    });

    const customer2 = await createModel(UserModel, {
      email: 'customer2@example.com',
      passwordHash: await bcrypt.hash('customer123', 10),
      name: 'Bob Smith',
      role: UserRole.CUSTOMER,
      phone: '+1888999000',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      postalCode: '90001',
      country: 'USA',
    });

    // Create stores
    const store1 = await createModel(StoreModel, {
      name: 'Tech Gadgets Main Store',
      description: 'Your one-stop shop for all tech gadgets',
      type: StoreType.RETAIL,
      address: '789 Tech Street',
      city: 'San Francisco',
      postalCode: '94105',
      country: 'USA',
      phone: '+14155551234',
      email: 'store@techgadgets.com',
      ownerId: getId(seller1),
    });

    const store2 = await createModel(StoreModel, {
      name: 'Fashion Trends Outlet',
      description: 'Latest fashion trends at affordable prices',
      type: StoreType.RETAIL,
      address: '321 Fashion Ave',
      city: 'New York',
      postalCode: '10018',
      country: 'USA',
      phone: '+12125551234',
      email: 'info@fashiontrends.com',
      ownerId: getId(seller2),
    });

    // Create products for seller1
    const product1 = await createModel(ProductModel, {
      name: 'Wireless Earbuds Pro',
      sku: 'TECH-001',
      description: 'High-quality wireless earbuds with noise cancellation',
      price: 129.99,
      stock: 100,
      unit: 'piece',
      sellerId: getId(seller1),
    });

    const product2 = await createModel(ProductModel, {
      name: 'Smart Watch X',
      sku: 'TECH-002',
      description: 'Feature-rich smartwatch with health tracking',
      price: 199.99,
      stock: 50,
      unit: 'piece',
      sellerId: getId(seller1),
    });

    // Create products for seller2
    const product3 = await createModel(ProductModel, {
      name: 'Casual T-Shirt',
      sku: 'FASH-001',
      description: 'Comfortable cotton t-shirt for everyday wear',
      price: 24.99,
      stock: 200,
      unit: 'piece',
      sellerId: getId(seller2),
    });

    // Create orders
    const order1 = await createModel(OrderModel, {
      status: OrderStatus.DELIVERED,
      totalAmount: 154.98,
      shippingAddress: '123 Main St, New York, NY 10001',
      contactNumber: '+1999888777',
      customerId: getId(customer1),
      deliveryPersonId: getId(deliveryPerson),
      deliveredAt: new Date(),
    });

    await createModel(OrderItemModel, {
      orderId: getId(order1),
      productId: getId(product1),
      quantity: 1,
      price: (product1 as any).price,
      status: OrderItemStatus.DELIVERED,
    });

    const order2 = await createModel(OrderModel, {
      status: OrderStatus.PROCESSING,
      totalAmount: 224.98,
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
      contactNumber: '+1888999000',
      customerId: getId(customer2),
    });

    await createModel(OrderItemModel, {
      orderId: getId(order2),
      productId: getId(product2),
      quantity: 1,
      price: (product2 as any).price,
      status: OrderItemStatus.CONFIRMED,
    });

    await createModel(OrderItemModel, {
      orderId: getId(order2),
      productId: getId(product3),
      quantity: 1,
      price: (product3 as any).price,
      status: OrderItemStatus.PENDING,
    });

    // Create store visits
    await createModel(StoreVisitModel, {
      storeId: getId(store1),
      salesmanId: getId(salesman),
      scheduledAt: new Date(),
      startedAt: new Date(),
      status: VisitStatus.COMPLETED,
      notes: 'Discussed new product line',
      totalSales: 1500.75,
    });

    await createModel(StoreVisitModel, {
      storeId: getId(store2),
      salesmanId: getId(salesman),
      scheduledAt: new Date(Date.now() + 86400000), // Tomorrow
      status: VisitStatus.SCHEDULED,
    });

    await t.commit();
    console.log('Database seeded successfully!');
    return true;
  } catch (error) {
    await t.rollback();
    console.error('Error seeding database:', error);
    throw error;
  }
}

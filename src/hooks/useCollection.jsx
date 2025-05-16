import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
export const useProduct = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/products");
      return data;
    },
  });
  return [products, isLoading, isError, refetch];
};
export const useTestimonial = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: testimonials = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/testimonials");
      return data;
    },
  });
  return [testimonials, isLoading, isError, refetch];
};
export const useOurMember = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: members = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/members");
      return data;
    },
  });
  return [members, isError, isLoading];
};
export const useMyCars = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: cars = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cars", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/cars?email=${user?.email}`);
      return data;
    },
  });
  return [cars, isError, isLoading, refetch];
};
export const useUsers = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: users = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users`);
      return data;
    },
  });
  return [users, isError, isLoading, refetch];
};
export const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin = false, isLoading } = useQuery({
    queryKey: ["admin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin-user/${user.email}`);
      return data?.admin;
    },
  });

  return [isAdmin, isLoading];
};

export const useAdminHome = () => {
  const axiosSecure = useAxiosSecure()
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stats")
      return data;
    },
  });
  return { stats };
};
export const useChartStats = () => {
  const axiosSecure = useAxiosSecure()
  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["chart-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/chart-stats")
      return data;
    },
  });
  return [ chartData, isLoading ];
};
export const usePayHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const { data: payments = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["pay-history", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/pay-history/${user?.email}`);
      return data;
    },
  });
  return [payments, isLoading, isError, refetch];
};


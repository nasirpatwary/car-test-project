import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
export const useProduct = () => {
  const axiosPublic = useAxiosPublic();
  const { data: products = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async() => {
      const { data } = await axiosPublic.get("/products");
      return data;
    }
  });
  return [products, isLoading, isError, refetch]
};
export const useTestimonial = () => {
  const axiosPublic = useAxiosPublic();
  const { data: testimonials = [], isLoading, isError} = useQuery({
    queryKey: ["testimonials"],
    queryFn: async() => {
      const { data } = await axiosPublic.get("/testimonials");
      return data;
    }
  });
  return [testimonials, isLoading, isError]
};

export const useOurMember = ()=>{
  const axiosPublic = useAxiosPublic();
  const { data: members = [], isError, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/members");
      return data;
    },
  });
  return [members, isError, isLoading]
}
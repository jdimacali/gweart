import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { API, BEARER } from "@/lib/constants";
import { getToken } from "@/lib/helpers";
import { useToast } from "@/components/ui/use-toast";



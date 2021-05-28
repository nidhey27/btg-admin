import { Injectable } from "@angular/core";

@Injectable()
export class GlobalConstants {
    public isLoggeddIn = false;
    public adminName = localStorage.getItem('name') ?? "BTG Admin"; 
    public role: Number = parseInt(localStorage.getItem('role')) ?? 2;
} 